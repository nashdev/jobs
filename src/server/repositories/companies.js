import db from "../database";

class CompaniesRepository {
  static async getById(id) {
    return db
      .first()
      .table("companies")
      .where("id", id);
  }

  static async getByIds(ids) {
    return db
      .select()
      .table("companies")
      .whereIn("id", ids)
      .orderBy("created_at", "desc");
  }

  static async getByUserIds(ids) {
    return db
      .select()
      .table("companies")
      .whereIn("user_id", ids)
      .orderBy("created_at", "desc");
  }

  static async getAll(cursor, limit, filter) {
    let query = db
      .select()
      .table("companies")
      .orderBy("created_at", "desc")
      .limit(limit);

    if (filter) {
      query = query.where("name", "ilike", `%${filter}%`);
    }

    if (cursor) {
      return query.where("created_at", "<", cursor);
    }

    return query;
  }

  static async create(company) {
    return db
      .insert(company)
      .into("companies")
      .returning("*");
  }

  static async update(company, userId) {
    return db
      .update(company)
      .table("companies")
      .where({ id: company.id, user_id: userId })
      .returning("*");
  }

  static async delete(id, userId) {
    // Delete all of the jobs for this company
    await db
      .table("jobs")
      .where({ company_id: id, user_id: userId })
      .delete();

    // Delete the company
    return await db
      .table("companies")
      .where({ id, user_id: userId })
      .delete()
      .returning("*");
  }
}

export default CompaniesRepository;
