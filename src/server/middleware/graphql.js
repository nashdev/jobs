import fs from 'fs';
import path from 'path';

import * as bodyParser from 'body-parser-graphql';
import { graphqlExpress } from 'apollo-server-express';
import { apolloUploadExpress, GraphQLUpload } from 'apollo-upload-server';
import { makeExecutableSchema } from 'graphql-tools';
import { importSchema } from 'graphql-import';
import { print } from 'graphql';
import expressPlayground from 'graphql-playground-middleware-express';

import defaultErrorFormatter from '../defaultErrorFormatter';
import resolvers from '../resolvers';
import Job from '../business/jobs';
import Company from '../business/companies';
import User from '../business/users';

const typeDefs = './src/server/schema.graphql';
const typeDefsString = buildTypeDefsString(typeDefs);
const uploadMixin = typeDefsString.includes('scalar Upload')
  ? { Upload: GraphQLUpload }
  : {};

const executableSchema = makeExecutableSchema({
  typeDefs: typeDefsString,
  resolvers: {
    ...uploadMixin,
    ...resolvers,
  },
});

if (!executableSchema) {
  throw new Error('No schema defined');
}

const reqContext = req => ({
  ...req,
  dataLoaders: {
    job: Job.getLoaders(),
    company: Company.getLoaders(),
    user: User.getLoaders(),
  },
  db: {
    Job,
    Company,
    User,
  },
});

export const graphqlBodyParser = bodyParser.graphql();
export const graphqlUploadHandler = apolloUploadExpress();
export const graphqlPlaygroundHandler = expressPlayground({
  endpoint: '/graphql',
  // subscriptionsEndpoint: subscriptionServerOptions.path,
});
export const graphqlRequestHandler = graphqlExpress(async request => {
  let context;

  try {
    context = await reqContext({ request });
  } catch (e) {
    console.error(e);
    throw e;
  }

  return {
    schema: executableSchema,
    tracing: true,
    // cacheControl: this.options.cacheControl,
    formatError: defaultErrorFormatter,
    // logFunction: this.options.logFunction,
    // rootValue: this.options.rootValue,
    // validationRules: this.options.validationRules,
    // fieldResolver: this.options.fieldResolver,
    // formatParams: this.options.formatParams,
    // formatResponse: this.options.formatResponse,
    // debug: this.options.debug,
    context,
  };
});

function isDocumentNode(node) {
  return node.kind === 'Document';
}

function mergeTypeDefs(typeDefs) {
  if (typeof typeDefs === 'string') {
    return typeDefs;
  }

  if (typeof typeDefs === 'function') {
    typeDefs = typeDefs();
  }

  if (isDocumentNode(typeDefs)) {
    return print(typeDefs);
  }

  return typeDefs.reduce((acc, t) => `${acc}\n${mergeTypeDefs(t)}`, '');
}

function buildTypeDefsString(typeDefs) {
  let typeDefinitions = mergeTypeDefs(typeDefs);

  // read from .graphql file if path provided
  if (typeDefinitions.endsWith('graphql')) {
    const schemaPath = path.resolve(typeDefinitions);

    if (!fs.existsSync(schemaPath)) {
      throw new Error(`No schema found for path: ${schemaPath}`);
    }

    typeDefinitions = importSchema(schemaPath);
  }

  return typeDefinitions;
}
