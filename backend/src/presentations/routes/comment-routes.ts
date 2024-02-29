import { FastifyInstance } from "fastify";
import { CommentFactory } from "../../domain/factories";

const factory = CommentFactory();

export const CommentRoutes = async (app: FastifyInstance) => {
  app.post("/", async (request, reply) => {
    return factory.create(request, reply);
  });

  app.post("/subcomment", async (request, reply) => {
    return factory.createSubComment(request, reply);
  });

  app.delete("/:id", async (request, reply) => {
    return factory.delete(request, reply);
  });
};
