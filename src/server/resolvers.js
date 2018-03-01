import { GraphQLDateTime } from 'graphql-iso-date';

const resolvers = {
  Datetime: GraphQLDateTime,
  Query: {
    jobs: async (parent, args, ctx, info) => ctx.db.Job.loadAll(ctx, args),
    job: async (parent, args, ctx, info) => ctx.db.Job.load(ctx, args),
    companies: async (parent, args, ctx, info) =>
      ctx.db.Company.loadAll(ctx, args),
    company: async (parent, args, ctx, info) => ctx.db.Company.load(ctx, args),
    users: async (parent, args, ctx, info) => ctx.db.User.loadAll(ctx, args),
    user: async (parent, args, ctx, info) => ctx.db.User.load(ctx, args),
    getToken: async (parent, args, ctx, info) =>
      ctx.db.User.getToken(ctx, args),
    me: async (parent, args, ctx, info) => ctx.db.User.me(ctx, args),
  },
  Job: {
    company: async (job, args, ctx) =>
      ctx.db.Company.load(ctx, { id: job.companyId }),
    user: async (job, args, ctx) => ctx.db.User.load(ctx, { id: job.userId }),
  },
  Company: {
    user: async (company, args, ctx) =>
      ctx.db.User.load(ctx, { id: company.userId }),
    jobs: async (company, args, ctx) =>
      ctx.db.Job.loadByCompanyId(ctx, {
        companyId: company.id,
      }),
  },
  User: {
    companies: async (user, args, ctx) =>
      ctx.db.Company.loadByUserId(ctx, { userId: user.id }),
    jobs: async (user, args, ctx) =>
      ctx.db.Job.loadByUserId(ctx, { userId: user.id }),
  },
  Mutation: {
    // Companies
    createCompany: (parent, args, ctx) => ctx.db.Company.create(ctx, args),
    updateCompany: (parent, args, ctx) => ctx.db.Company.update(ctx, args),
    deleteCompany: (parent, args, ctx) => ctx.db.Company.delete(ctx, args),
    // Jobs
    createJob: (parent, args, ctx) => ctx.db.Job.create(ctx, args),
    updateJob: (parent, args, ctx) => ctx.db.Job.update(ctx, args),
    deleteJob: (parent, args, ctx) => ctx.db.Job.delete(ctx, args),
    // Users
    updateUser: (parent, args, ctx) => ctx.db.User.update(ctx, args),
    deleteUser: (parent, args, ctx) => ctx.db.User.delete(ctx, args),
  },
};

export default resolvers;
