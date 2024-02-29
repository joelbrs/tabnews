import { prisma } from "../../infra/utils/prisma";
import CommentService from "../../application/services/comment-service";
import PrismaCommentRepository from "../../infra/repositories/prisma/prisma-comment-repository";
import CommentController from "../../presentations/controllers/comment-controller";

export const CommentFactory = (): CommentController => {
  const repository = new PrismaCommentRepository(prisma);
  const service = new CommentService(repository);

  return new CommentController(service);
};
