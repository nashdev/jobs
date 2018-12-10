import { GraphQLDateTime } from "graphql-iso-date";

import JobsService from "./services/jobs";
import CompaniesService from "./services/companies";
import UsersService from "./services/users";
import SlackService from "./services/slack";

const resolvers = {
  Datetime: GraphQLDateTime,
  Query: {
    jobs: async (parent, args, ctx) => {
      try {
        return JobsService.loadAll(ctx, args);
      } catch (error) {
        console.error("Jobs Resolver Error", error);
      }
    },
    job: async (parent, args, ctx) => {
      try {
        return JobsService.load(ctx, args);
      } catch (error) {
        console.error("Job Resolver Error", error);
      }
    },
    companies: async (parent, args, ctx) => {
      try {
        return CompaniesService.loadAll(ctx, args);
      } catch (error) {
        console.error("Companies Resolver Error", error);
      }
    },
    company: async (parent, args, ctx) => {
      try {
        return CompaniesService.load(ctx, args);
      } catch (error) {
        console.error("Company Resolver Error", error);
      }
    },

    users: async (parent, args, ctx) => {
      try {
        return UsersService.loadAll(ctx, args);
      } catch (error) {
        console.error("Users Resolver Error", error);
      }
    },
    user: async (parent, args, ctx) => {
      try {
        return UsersService.load(ctx, args);
      } catch (error) {
        console.error("User Resolver Error", error);
      }
    },
    getToken: async (parent, args, ctx) => {
      try {
        return UsersService.getToken(ctx, args);
      } catch (error) {
        console.error("Get token Resolver Error", error);
      }
    },
    me: async (parent, args, ctx) => {
      try {
        return UsersService.me(ctx, args);
      } catch (error) {
        console.error("Me Resolver Error", error);
      }
    },
  },
  Job: {
    company: async (job, args, ctx) => {
      try {
        return CompaniesService.load(ctx, { id: job.companyId });
      } catch (error) {
        console.error("Company Resolver Error", error);
      }
    },
    user: async (job, args, ctx) => {
      try {
        return UsersService.load(ctx, { id: job.userId });
      } catch (error) {
        console.error("User Resolver Error", error);
      }
    },
  },
  Company: {
    user: async (company, args, ctx) => {
      try {
        return UsersService.load(ctx, { id: company.userId });
      } catch (error) {
        console.error("User Resolver Error", error);
      }
    },
    jobs: async (company, args, ctx) => {
      try {
        return JobsService.loadByCompanyId(ctx, {
          companyId: company.id,
        });
      } catch (error) {
        console.error("Ctx Resolver Error", error);
      }
    },
  },
  User: {
    companies: async (user, args, ctx) => {
      try {
        return CompaniesService.loadByUserId(ctx, { userId: user.id });
      } catch (error) {
        console.error("Companies Resolver Error", error);
      }
    },
    jobs: async (user, args, ctx) => {
      try {
        return JobsService.loadByUserId(ctx, { userId: user.id });
      } catch (error) {
        console.error("Jobs Resolver Error", error);
      }
    },
  },
  Mutation: {
    // Companies
    createCompany: (parent, args, ctx) => CompaniesService.create(ctx, args),
    updateCompany: (parent, args, ctx) => CompaniesService.update(ctx, args),
    deleteCompany: (parent, args, ctx) => CompaniesService.delete(ctx, args),
    // Jobs
    createJob: async (parent, args, ctx) => {
      try {
        const job = await JobsService.create(ctx, args);
        if (job && job.id) {
          await SlackService.notify({ job });
        }
        return job;
      } catch (error) {
        console.error("Create Job Mutation Error", error);
      }
    },
    updateJob: (parent, args, ctx) => JobsService.update(ctx, args),
    deleteJob: (parent, args, ctx) => JobsService.delete(ctx, args),
    // Users
    updateUser: (parent, args, ctx) => UsersService.update(ctx, args),
    deleteUser: (parent, args, ctx) => UsersService.delete(ctx, args),
  },
};

export default resolvers;
