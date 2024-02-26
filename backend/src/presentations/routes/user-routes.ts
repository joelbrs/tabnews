import { FastifyInstance } from "fastify";
import { UserFactory } from "../../domain/factories";
import { VerifyJwt } from "../../infra/middlewares/verify-jwt";

const factory = UserFactory();

export const UserRoutes = async (app: FastifyInstance) => {
  app.get("/logged", { onRequest: VerifyJwt }, async (request, reply) => {
    return await factory.getLoggedUser(request, reply);
  });

  app.post("/", async (request, reply) => {
    return await factory.create(request, reply);
  });

  app.post("/auth", async (request, reply) => {
    return await factory.authenticate(request, reply);
  });

  app.put("/:id", { onRequest: VerifyJwt }, async (request, reply) => {
    return await factory.update(request, reply);
  });
};
