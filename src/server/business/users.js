import { WebClient } from '@slack/client';
import jwt from 'jsonwebtoken';
import DataLoader from 'dataloader';

import UserQueryBuilder from '../database/builders/users';

class User {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.location = data.location;
    this.website = data.website;
    this.picture = data.picture;
    this.email = data.email;
    this.password = data.password;
    this.passwordResetToken = data.passwordResetToken;
    this.passwordResetExpires = data.passwordResetExpires;
    this.facebook = data.facebook;
    this.github = data.github;
    this.twitter = data.twitter;
    this.google = data.google;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }

  static getLoaders() {
    const getById = new DataLoader(ids =>
      UserQueryBuilder.getByIds(ids).then(rows =>
        ids.map(id => rows.find(x => x.id == id)),
      ),
    );

    const primeLoaders = users => {
      users.forEach(user => getById.clear(user.id).prime(user.id, user));
    };
    return { getById, primeLoaders };
  }

  static async load(ctx, args) {
    if (!args.id) return null;
    const data = await ctx.dataLoaders.user.getById.load(args.id);
    if (!data) return null;
    return new User(data);
  }

  static async loadAll(ctx, { cursor, limit = 10, filter }) {
    const data = await UserQueryBuilder.getAll(cursor, limit, filter);
    ctx.dataLoaders.user.primeLoaders(data);
    const res = data.map(row => new User(row));
    if (!res.length) return null;
    return {
      cursor: res[res.length - 1].createdAt,
      entries: res,
    };
  }

  static async me(ctx, args) {
    if (!ctx.request.user) {
      return null;
    }
    const { userId } = ctx.request.user;
    return User.load(ctx, { id: userId });
  }
  static async getToken(ctx, { code }) {
    const client = new WebClient();
    const clientId = process.env.SLACK_CLIENT_ID;
    const clientSecret = process.env.SLACK_CLIENT_SECRET;

    // 1. Use code to fetch user identity from slack api.
    const { access_token } = await client.oauth.access(
      clientId,
      clientSecret,
      code,
    );

    const newClient = new WebClient(access_token);
    const {
      user: { email, id: slackId, image_192: picture, name },
    } = await newClient.users.identity();

    // 2. Check if this is an existing user, if so, create a new token
    const existingUser = await UserQueryBuilder.getByEmail(email);
    let user;

    if (existingUser) {
      // Update the user
      [user] = await UserQueryBuilder.update(
        {
          picture,
          name,
          updated_at: 'NOW()',
        },
        existingUser.id,
      );
    } else {
      // 3. If not, create a new user record and return a new token.
      // We don't have a user, let's create one with this e-mail.
      [user] = await UserQueryBuilder.create({
        email,
        slackId,
        picture,
        name,
        created_at: 'NOW()',
        updated_at: 'NOW()',
      });
    }
    const expiresIn = 60 * 60 * 24 * 180; // 180 days

    return {
      expiresIn,
      token: jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET, {
        expiresIn,
      }),
      user: new User(user),
    };
  }

  // static async create(ctx, { password, ...user }) {
  //   const hashedPassword = await bcrypt.hash(password, 10);

  //   const [userRes] = await UserQueryBuilder.create({
  //     ...user,
  //     password: hashedPassword
  //   });

  //   const token = jwt.sign({ userId: userRes.id }, TOKEN_SECRET);

  //   return {
  //     token,
  //     user: new User(userRes)
  //   };
  // }

  static async update(ctx, { user }) {
    const { userId } = ctx.request.user;
    const data = await UserQueryBuilder.update(user, userId);
    if (!data) return null;
    return new User(data[0]);
  }

  static async delete(ctx, { id }) {
    const { userId } = ctx.request.user;
    const data = await UserQueryBuilder.delete(id, userId);
    if (!data) return null;
    return new User(data[0]);
  }
}

export default User;
