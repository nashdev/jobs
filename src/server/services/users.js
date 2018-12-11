import { WebClient } from "@slack/client";
import jwt from "jsonwebtoken";
import DataLoader from "dataloader";

import UsersRepository from "../repositories/users";

class UserDTO {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.location = data.location;
    this.website = data.website;
    this.picture = data.picture;

    this.available = data.available;
    this.public = data.public;
    this.resume = data.resume;
    this.twitter = data.twitter;
    this.linkedin = data.linkedin;
    this.github = data.github;
    this.facebook = data.facebook;

    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
    this.slackId = data.slackId;
  }
}

class UsersService {
  static getLoaders() {
    const getById = new DataLoader((ids) =>
      UsersRepository.getByIds(ids).then((rows) =>
        ids.map((id) => rows.find((x) => x.id == id))
      )
    );

    const primeLoaders = (users) => {
      users.forEach((user) => getById.clear(user.id).prime(user.id, user));
    };
    return { getById, primeLoaders };
  }

  static async load(ctx, args) {
    if (!args.id) return null;
    const data = await ctx.dataLoaders.user.getById.load(args.id);
    if (!data) return null;

    if (
      (!data.public && !ctx.request.user) ||
      (!data.public && ctx.request.user && ctx.request.user.userId !== args.id)
    ) {
      return new UserDTO({
        id: data.id,
      });
    }

    if (
      !data.public &&
      (ctx.request.user && ctx.request.user.userId !== args.id)
    ) {
      return null;
    }
    return new UserDTO(data);
  }

  static async loadAll(ctx, { cursor, limit = 10, filter, availableOnly }) {
    const data = await UsersRepository.getAll(
      cursor,
      limit,
      filter,
      availableOnly
    );
    ctx.dataLoaders.user.primeLoaders(data);
    const res = data.map((row) => new UserDTO(row));
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

  static async me(ctx) {
    if (!ctx.request.user) {
      return null;
    }
    const { userId } = ctx.request.user;
    return UsersService.load(ctx, { id: userId });
  }

  static async getToken(ctx, { code }) {
    const client = new WebClient();
    const clientId = process.env.SLACK_CLIENT_ID;
    const clientSecret = process.env.SLACK_CLIENT_SECRET;

    // 1. Use code to fetch user identity from slack api.
    const { access_token: accessToken } = await client.oauth.access({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: encodeURI(process.env.SLACK_REDIRECT_URI),
    });

    const newClient = new WebClient(accessToken);
    const {
      user: { email, name, id: slackId, image_192: picture },
    } = await newClient.users.identity();

    // TODO: Change this to check by slackid instead of email?
    // 2. Check if this is an existing user, if so, create a new token
    const existingUser = await UsersRepository.getByEmail(email);
    let user;

    if (existingUser) {
      // Update the user
      [user] = await UsersRepository.update(
        {
          picture,
          name,
          slackId,
          updated_at: "NOW()",
        },
        existingUser.id
      );
    } else {
      // 3. If not, create a new user record and return a new token.
      // We don't have a user, let's create one with this e-mail.
      [user] = await UsersRepository.create({
        email,
        slackId,
        picture,
        name,
        created_at: "NOW()",
        updated_at: "NOW()",
      });
    }
    const expiresIn = 60 * 60 * 24 * 180; // 180 days

    return {
      expiresIn,
      token: jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET, {
        expiresIn,
      }),
      user: new UserDTO(user),
    };
  }

  static async update(ctx, { user }) {
    const { userId } = ctx.request.user;
    const data = await UsersRepository.update(user, userId);
    if (!data) return null;
    return new UserDTO(data[0]);
  }

  static async delete(ctx, { id }) {
    const { userId } = ctx.request.user;
    const data = await UsersRepository.delete(id, userId);
    if (!data) return null;
    return new UserDTO(data[0]);
  }
}

export default UsersService;
