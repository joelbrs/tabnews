import PostService from "../../application/services/post-service";
import PrismaPostRepository from "../../infra/repositories/prisma/prisma-post-repository";
import { prisma } from "../../infra/utils/prisma";
import PostController from "../../presentations/controllers/post-controller";

export const PostFactory = (): PostController => {
  const repository = new PrismaPostRepository(prisma);
  const service = new PostService(repository);

  return new PostController(service);
};
