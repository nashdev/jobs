import DataLoader from "dataloader";
import JobsRepository from "../repositories/jobs";

class JobDTO {
  constructor(data) {
    this.id = data.id;
    this.userId = data.user_id;
    this.companyId = data.company_id;
    this.title = data.title;
    this.description = data.description;
    this.short_description = data.short_description;
    this.type = data.type;
    this.recruiter = data.recruiter;
    this.recruiterAgency = data.recruiter_agency;
    this.location = data.location;
    this.website = data.website;
    this.experienceRange = data.experience_range;
    this.salary = data.salary_range;
    this.remote = data.remote_available;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }
}
class JobsService {
  static getLoaders() {
    const getById = new DataLoader((ids) =>
      JobsRepository.getByIds(ids).then((rows) =>
        ids.map((id) => rows.find((x) => x.id == id))
      )
    );
    const getByCompanyId = new DataLoader((ids) =>
      JobsRepository.getByCompanyIds(ids).then((rows) =>
        ids.map((id) => rows.filter((x) => x.company_id === id))
      )
    );
    const getByUserId = new DataLoader((ids) =>
      JobsRepository.getByUserIds(ids).then((rows) =>
        ids.map((id) => rows.filter((x) => x.user_id === id))
      )
    );

    const primeLoaders = (jobs) => {
      jobs.forEach((job) => getById.clear(job.id).prime(job.id, job));
    };
    return { getById, getByUserId, getByCompanyId, primeLoaders };
  }

  static async load(ctx, args) {
    if (!args.id) return null;
    const data = await ctx.dataLoaders.job.getById.load(args.id);
    if (!data) return null;
    return new JobDTO(data);
  }

  static async loadByCompanyId(ctx, { companyId }) {
    if (!companyId) return null;
    const data = await ctx.dataLoaders.job.getByCompanyId.load(companyId);

    if (!data) return null;

    return data.map((row) => new JobDTO(row));
  }

  static async loadByUserId(ctx, { userId }) {
    if (!userId) return null;
    const data = await ctx.dataLoaders.job.getByUserId.load(userId);
    if (!data) return null;
    return data.map((row) => new JobDTO(row));
  }

  static async loadAll(ctx, { cursor, limit = 10, filter, type }) {
    const data = await JobsRepository.getAll(cursor, limit, filter, type);
    ctx.dataLoaders.job.primeLoaders(data);
    const res = data.map((row) => new JobDTO(row));
    if (!res.length) return null;

    let newCursor = res[res.length - 1].createdAt;
    if (res.length !== limit) {
      newCursor = null;
    }

    return {
      cursor: newCursor,
      entries: res,
    };
  }

  static async create(ctx, { job }) {
    // Todo: Make the user has access to add a job to this company.

    const { userId } = ctx.request.user;
    const data = await JobsRepository.create({
      ...job,
      user_id: userId,
      created_at: "NOW()",
      updated_at: "NOW()",
    });

    if (!data) return null;
    return new JobDTO(data[0]);
  }

  static async update(ctx, { job }) {
    const { userId } = ctx.request.user;
    const data = await JobsRepository.update(
      {
        ...job,
        updated_at: "NOW()",
      },
      userId
    );
    if (!data) return null;
    return new JobDTO(data[0]);
  }

  static async delete(ctx, { id }) {
    const { userId } = ctx.request.user;
    const data = await JobsRepository.delete(id, userId);
    if (!data) return null;
    return new JobDTO(data[0]);
  }
}

export default JobsService;
