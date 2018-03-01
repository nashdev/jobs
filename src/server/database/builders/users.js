import db from '../';

class UserQueryBuilder {
  static async getById(id) {
    return db
      .first()
      .table('users')
      .where('id', id)
      .orderBy('created_at', 'desc');
  }
  static async getByIds(ids) {
    return db
      .select()
      .table('users')
      .whereIn('id', ids)
      .orderBy('created_at', 'desc');
  }

  static async getByEmail(email) {
    return db
      .first()
      .table('users')
      .where('email', email);
  }
  static async getAll(cursor, limit, filter) {
    let query = db
      .select()
      .table('users')
      .orderBy('created_at', 'desc')
      .limit(limit);

    if (filter) {
      query = query.where('name', 'ilike', `%${filter}%`);
    }

    if (cursor) {
      return query.where('created_at', '<', cursor);
    }

    return query;
  }

  static async create(user) {
    return db
      .insert(user)
      .into('users')
      .returning('*');
  }

  static async update(user, userId) {
    return db
      .update(user)
      .table('users')
      .where({ id: userId })
      .returning('*');
  }

  static async delete(id, userId) {
    if (id !== userId) {
      throw new Error('You cannot delete this user.');
    }
    return db
      .table('users')
      .where({ id: userId })
      .delete()
      .returning('*');
  }
}

export default UserQueryBuilder;
