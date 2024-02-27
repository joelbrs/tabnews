import { FastifyInstance } from "fastify";
import { VerifyJwt } from "../../infra/middlewares/verify-jwt";
import { PostFactory } from "../../domain/factories";

const factory = PostFactory();

export const PostRoutes = async (app: FastifyInstance) => {
  app.get("/", async (request, reply) => {
    return factory.getAll(request, reply);
  });

  app.post("/", { onRequest: VerifyJwt }, async (request, reply) => {
    return factory.create(request, reply);
  });
};
