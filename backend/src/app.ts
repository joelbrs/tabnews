import fastify from "fastify";
import { UserRoutes } from "./presentations/routes/user-routes";

export const app = fastify({ logger: true });

app.register(UserRoutes, { prefix: "/users" });
