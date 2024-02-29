import { FastifyInstance } from "fastify";
import { UserFactory } from "../../domain/factories";
import { VerifyJwt } from "../../infra/middlewares/verify-jwt";
import { request } from "https";

const factory = UserFactory();

export const UserRoutes = async (app: FastifyInstance) => {
  app.get("/logged", { onRequest: VerifyJwt }, async (request, reply) => {
    return factory.getLoggedUser(request, reply);
  });

  app.get("/:username", { onRequest: VerifyJwt }, async (request, reply) => {
    return factory.findByUsername(request, reply);
  });

  app.post("/auth", async (request, reply) => {
    return factory.authenticate(request, reply);
  });

  app.post("/logout", { onRequest: VerifyJwt }, async (request, reply) => {
    return factory.logout(request, reply);
  });

  app.post("/", async (request, reply) => {
    return factory.create(request, reply);
  });

  app.put("/", { onRequest: VerifyJwt }, async (request, reply) => {
    return factory.update(request, reply);
  });
};
