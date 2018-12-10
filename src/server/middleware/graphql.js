import fs from "fs";
import path from "path";

import * as bodyParser from "body-parser-graphql";
import { ApolloServer, gql } from "apollo-server-express";

import paths from "../../../config/paths";
import resolvers from "../resolvers";
import JobsService from "../services/jobs";
import CompaniesService from "../services/companies";
import UsersService from "../services/users";

const directiveResolvers = {
  isOwner: (next, source, args, ctx, info) => {
    // If this field is attached to a User schema, user the primary key (id),
    // otherwise, use the foreign key (user_id);
    const parentType = info.parentType.toString();
    const fk = parentType === "User" ? "id" : "user_id";

    return next().then((field) => {
      if (ctx.request.user.userId !== source[fk]) {
        return null;
      }
      return field;
    });
  },
};

const typeDefs = gql(
  fs.readFileSync(path.resolve(paths.srcServer, "schema.graphql"), "utf8")
);

export const graphqlBodyParser = bodyParser.graphql();
export const graphqlRequestHandler = new ApolloServer({
  typeDefs,
  resolvers,
  directiveResolvers,
  introspection: true,
  playground: true,
  context: ({ req }) => ({
    request: req,
    dataLoaders: {
      job: JobsService.getLoaders(),
      company: CompaniesService.getLoaders(),
      user: UsersService.getLoaders(),
    },
  }),
});
