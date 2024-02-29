import { prisma } from "../../infra/utils/prisma";
import PostService from "../../application/services/post-service";
import PrismaPostRepository from "../../infra/repositories/prisma/prisma-post-repository";
import PostController from "../../presentations/controllers/post-controller";
import { FactoryUserService } from "./user-factory";

export const PostFactory = (): PostController => {
  const userService = FactoryUserService();

  const repository = new PrismaPostRepository(prisma);
  const service = new PostService(repository, userService);

  return new PostController(service);
};
