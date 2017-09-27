import { schema } from "normalizr";

export const userSchema = new schema.Entity("users");
export const companySchema = new schema.Entity("companies");
export const jobSchema = new schema.Entity("jobs");

jobSchema.define({
  user: userSchema,
  company: companySchema
});
companySchema.define({
  user: userSchema,
  jobs: [jobSchema]
});

export const companyListSchema = [companySchema];
export const jobListSchema = [jobSchema];
