import { FastifyInstance } from "fastify";
import { VerifyJwt } from "../../infra/middlewares/verify-jwt";
import { PostFactory } from "../../domain/factories";

const factory = PostFactory();

export const PostRoutes = async (app: FastifyInstance) => {
  app.get("/", async (request, reply) => {
    return factory.getAll(request, reply);
  });

  app.get("/user/:id", async (request, reply) => {
    return factory.getPostsByUser(request, reply);
  });

  app.get("/:id", async (request, reply) => {
    return factory.findById(request, reply);
  });

  app.post("/", { onRequest: VerifyJwt }, async (request, reply) => {
    return factory.create(request, reply);
  });

  app.patch(
    "/increment/:id",
    { onRequest: VerifyJwt },
    async (request, reply) => {
      return factory.incrementTabCoins(request, reply);
    }
  );

  app.patch(
    "/decrement/:id",
    { onRequest: VerifyJwt },
    async (request, reply) => {
      return factory.decrementTabCoins(request, reply);
    }
  );
};
