import DataLoader from "dataloader";
import CompaniesRepository from "../repositories/companies";

class CompanyDTO {
  constructor(data) {
    this.id = data.id;
    this.userId = data.user_id;
    this.name = data.name;
    this.location = data.location;
    this.size = data.size;
    this.short_description = data.short_description;
    this.facebook = data.facebook;
    this.twitter = data.twitter;
    this.linkedin = data.linkedin;
    this.github = data.github;
    this.description = data.description;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }
}

class CompaniesService {
  static getLoaders() {
    const getById = new DataLoader((ids) =>
      CompaniesRepository.getByIds(ids).then((rows) =>
        ids.map((id) => rows.find((x) => x.id == id))
      )
    );
    const getByUserId = new DataLoader((ids) =>
      CompaniesRepository.getByUserIds(ids).then((rows) =>
        ids.map((id) => rows.filter((x) => x.user_id === id))
      )
    );
    const primeLoaders = (companies) => {
      companies.forEach((company) =>
        getById.clear(company.id).prime(company.id, company)
      );
    };
    return { getById, getByUserId, primeLoaders };
  }

  static async load(ctx, args) {
    if (!args.id) return null;
    const data = await ctx.dataLoaders.company.getById.load(args.id);
    if (!data) return null;
    return new CompanyDTO(data);
  }

  static async loadByUserId(ctx, { userId }) {
    if (!userId) return null;
    const data = await ctx.dataLoaders.company.getByUserId.load(userId);
    if (!data) return null;
    return data.map((row) => new CompanyDTO(row));
  }

  static async loadAll(ctx, { cursor, limit = 10, filter }) {
    const data = await CompaniesRepository.getAll(cursor, limit, filter);
    ctx.dataLoaders.company.primeLoaders(data);
    const res = data.map((row) => new CompanyDTO(row));

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

  static async create(ctx, { company }) {
    const { userId } = ctx.request.user;
    const data = await CompaniesRepository.create({
      ...company,
      user_id: userId,
      created_at: "NOW()",
      updated_at: "NOW()",
    });
    if (!data) return null;
    return new CompanyDTO(data[0]);
  }

  static async update(ctx, { company }) {
    const { userId } = ctx.request.user;
    const data = await CompaniesRepository.update(company, userId);
    if (!data) return null;
    return new CompanyDTO(data[0]);
  }

  static async delete(ctx, { id }) {
    const { userId } = ctx.request.user;
    const data = await CompaniesRepository.delete(id, userId);
    if (!data) return null;
    return new CompanyDTO(data[0]);
  }
}

export default CompaniesService;
