import DataLoader from 'dataloader';
import JobQueryBuilder from '../database/builders/jobs';

class Job {
  constructor(data) {
    this.id = data.id;
    this.userId = data.user_id;
    this.companyId = data.company_id;

    this.title = data.title;
    this.description = data.description;
    this.type = data.type;
    this.recruiter = data.recruiter;
    this.recruiterAgency = data.recruiter_agency;
    this.location = data.location;
    this.experienceRange = data.experience_range;
    this.salary = data.salary_range;
    this.remote = data.remote_available;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;

    this.contact = {
      slack: data.contact_slack,
      email: data.contact_email,
      website: data.contact_website,
      person: data.contact_person,
      phone: data.contact_phone,
    };
  }

  static getLoaders() {
    const getById = new DataLoader(ids =>
      JobQueryBuilder.getByIds(ids).then(rows =>
        ids.map(id => rows.find(x => x.id == id)),
      ),
    );
    const getByCompanyId = new DataLoader(ids =>
      JobQueryBuilder.getByCompanyIds(ids).then(rows =>
        ids.map(id => rows.filter(x => x.company_id === id)),
      ),
    );
    const getByUserId = new DataLoader(ids =>
      JobQueryBuilder.getByUserIds(ids).then(rows =>
        ids.map(id => rows.filter(x => x.user_id === id)),
      ),
    );

    const primeLoaders = jobs => {
      jobs.forEach(job => getById.clear(job.id).prime(job.id, job));
    };
    return { getById, getByUserId, getByCompanyId, primeLoaders };
  }

  static async load(ctx, args) {
    if (!args.id) return null;
    const data = await ctx.dataLoaders.job.getById.load(args.id);
    if (!data) return null;
    return new Job(data);
  }

  static async loadByCompanyId(ctx, { companyId }) {
    if (!companyId) return null;
    const data = await ctx.dataLoaders.job.getByCompanyId.load(companyId);

    if (!data) return null;

    return data.map(row => new Job(row));
  }

  static async loadByUserId(ctx, { userId }) {
    if (!userId) return null;
    const data = await ctx.dataLoaders.job.getByUserId.load(userId);
    if (!data) return null;
    return data.map(row => new Job(row));
  }

  static async loadAll(ctx, { cursor, limit = 10, filter }) {
    const data = await JobQueryBuilder.getAll(cursor, limit, filter);
    ctx.dataLoaders.job.primeLoaders(data);
    const res = data.map(row => new Job(row));
    if (!res.length) return null;
    return {
      cursor: res[res.length - 1].createdAt,
      entries: res,
    };
  }

  static async create(ctx, { job }) {
    // Todo: Make the user has access to add a job to this company.

    const { userId } = ctx.request.user;
    const data = await JobQueryBuilder.create({
      ...job,
      user_id: userId,
      created_at: 'NOW()',
      updated_at: 'NOW()',
    });

    if (!data) return null;
    return new Job(data[0]);
  }

  static async update(ctx, { job }) {
    const { userId } = ctx.request.user;
    const data = await JobQueryBuilder.update(
      {
        ...job,
        updated_at: 'NOW()',
      },
      userId,
    );
    if (!data) return null;
    return new Job(data[0]);
  }

  static async delete(ctx, { id }) {
    const { userId } = ctx.request.user;
    const data = await JobQueryBuilder.delete(id, userId);
    if (!data) return null;
    return new Job(data[0]);
  }
}

export default Job;
