import db from "../database";

class JobsRepository {
  static async getById(id) {
    return db
      .first()
      .table("jobs")
      .where("id", id);
  }

  static async getByIds(ids) {
    return db
      .select()
      .table("jobs")
      .whereIn("id", ids)
      .orderBy("created_at", "desc");
  }

  static async getByCompanyIds(ids) {
    return db
      .select()
      .table("jobs")
      .whereIn("company_id", ids)
      .orderBy("created_at", "desc");
  }

  static async getByUserIds(ids) {
    return db
      .select()
      .table("jobs")
      .whereIn("user_id", ids)
      .orderBy("created_at", "desc");
  }

  static async getAll(cursor, limit, filter, type) {
    let query = db
      .select()
      .table("jobs")
      .orderBy("created_at", "desc")
      .limit(limit);

    if (filter) {
      query = query.where("title", "ilike", `%${filter}%`);
    }

    if (type && type !== "all") {
      query = query.where("type", type);
    }

    if (cursor) {
      return query.where("created_at", "<", cursor);
    }

    return query;
  }

  static async create(job) {
    return db
      .insert(job)
      .into("jobs")
      .returning("*");
  }

  static async update(job, userId) {
    return db
      .update(job)
      .table("jobs")
      .where({ id: job.id, user_id: userId })
      .returning("*");
  }

  static async delete(id, userId) {
    return db
      .table("jobs")
      .where({ id, user_id: userId })
      .delete()
      .returning("*");
  }
}

export default JobsRepository;
