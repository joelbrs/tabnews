import { FastifyInstance } from "fastify";
import { UserFactory } from "../../domain/factories";

const factory = UserFactory();

export const UserRoutes = async (app: FastifyInstance) => {
  app.post("/", async (request, reply) => {
    return await factory.create(request, reply);
  });

  app.post("/auth", async (request, reply) => {
    return await factory.authenticate(request, reply);
  });
};
