import { FastifyRequest } from "fastify";
import PostRepository from "../../infra/repositories/post-repository";
import { z } from "zod";
import {
  DEFAULT_PAGE,
  DEFAULT_SIZE,
} from "../../infra/utils/constants/pagination";
import UserService from "./user-service";

export default class PostService {
  constructor(
    private readonly _postRepository: PostRepository,
    private readonly _userService: UserService
  ) {}

  async getAll(request: FastifyRequest) {
    const { page, size } = request.query as {
      page: number | null;
      size: number | null;
    };

    const posts = await this._postRepository.getAll({
      page: page ?? DEFAULT_PAGE,
      size: size ?? DEFAULT_SIZE,
    });

    for (const post of posts.content) {
      const creator = await this._userService.findById(post.creator_id);
      post.creator_name = creator.username;
    }

    return posts;
  }

  async getPostsByUser(request: FastifyRequest) {
    const { page, size } = request.query as {
      page: number | null;
      size: number | null;
    };

    const { sub }: { sub: string } = await request.jwtVerify();

    const posts = await this._postRepository.getPostsByUser(sub, {
      page: page ?? DEFAULT_PAGE,
      size: size ?? DEFAULT_SIZE,
    });

    for (const post of posts.content) {
      const creator = await this._userService.findById(post.creator_id);
      post.creator_name = creator.username;
    }
    return posts;
  }

  async create(request: FastifyRequest) {
    const bodySchema = z.object({
      title: z.string().max(255),
      description: z.string().max(500),
      font: z.string().url().nullable(),
    });

    const data = bodySchema.parse(request.body);
    const { sub: creator_id }: { sub: string } = await request.jwtVerify();

    await this._postRepository.create({ ...data, creator_id });

    await this._userService.updateTabCoins({
      id: creator_id,
      tabcoins: 5,
      type: "add",
    });
  }

  async findById(request: FastifyRequest) {
    const { id } = request.params as { id: string };

    const posts = await this._postRepository.findById(id);

    if (!posts) {
      throw new Error("Post does not exists!");
    }
    return posts;
  }

  async incrementTabCoins(request: FastifyRequest) {
    const { id } = request.params as { id: string };
    const posts = await this.findById(request);

    const { sub: creator_id }: { sub: string } = await request.jwtVerify();

    await this._postRepository.updateTabCoins(id, posts.tabcoins + 1);
    await this._userService.updateTabCoins({
      id: creator_id,
      tabcoins: 1,
      type: "add",
    });
  }

  async decrementTabCoins(request: FastifyRequest) {
    const { id } = request.params as { id: string };
    const posts = await this.findById(request);

    console.log(posts);

    const { sub: creator_id }: { sub: string } = await request.jwtVerify();

    await this._postRepository.updateTabCoins(id, posts.tabcoins - 1);
    await this._userService.updateTabCoins({
      id: creator_id,
      tabcoins: 1,
      type: "sub",
    });
  }
}
