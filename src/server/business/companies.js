import DataLoader from 'dataloader';
import CompanyQueryBuilder from '../database/builders/companies';

class Company {
  constructor(data) {
    this.id = data.id;
    this.userId = data.user_id;
    this.name = data.name;
    this.location = data.location;
    this.phone = data.phone;
    this.size = data.size;
    this.description = data.description;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }

  static getLoaders() {
    const getById = new DataLoader(ids =>
      CompanyQueryBuilder.getByIds(ids).then(rows =>
        ids.map(id => rows.find(x => x.id == id)),
      ),
    );
    const getByUserId = new DataLoader(ids =>
      CompanyQueryBuilder.getByUserIds(ids).then(rows =>
        ids.map(id => rows.filter(x => x.user_id === id)),
      ),
    );
    const primeLoaders = companies => {
      companies.forEach(company =>
        getById.clear(company.id).prime(company.id, company),
      );
    };
    return { getById, getByUserId, primeLoaders };
  }

  static async load(ctx, args) {
    if (!args.id) return null;
    const data = await ctx.dataLoaders.company.getById.load(args.id);
    if (!data) return null;
    return new Company(data);
  }

  static async loadByUserId(ctx, { userId }) {
    if (!userId) return null;
    const data = await ctx.dataLoaders.company.getByUserId.load(userId);
    if (!data) return null;
    return data.map(row => new Company(row));
  }

  static async loadAll(ctx, { cursor, limit = 10, filter }) {
    const data = await CompanyQueryBuilder.getAll(cursor, limit, filter);
    ctx.dataLoaders.company.primeLoaders(data);
    const res = data.map(row => new Company(row));

    if (!res.length) return null;
    return {
      cursor: res[res.length - 1].createdAt,
      entries: res,
    };
  }

  static async create(ctx, { company }) {
    const { userId } = ctx.request.user;
    const data = await CompanyQueryBuilder.create({
      ...company,
      user_id: userId,
      created_at: 'NOW()',
      updated_at: 'NOW()',
    });
    if (!data) return null;
    return new Company(data[0]);
  }

  static async update(ctx, { company }) {
    const { userId } = ctx.request.user;
    const data = await CompanyQueryBuilder.update(company, userId);
    if (!data) return null;
    return new Company(data[0]);
  }

  static async delete(ctx, { id }) {
    const { userId } = ctx.request.user;
    const data = await CompanyQueryBuilder.delete(id, userId);
    if (!data) return null;
    return new Company(data[0]);
  }
}

export default Company;
