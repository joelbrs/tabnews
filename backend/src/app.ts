import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import { UserRoutes } from "./presentations/routes/user-routes";
import { env } from "./infra/utils/environments";
import { PostRoutes } from "./presentations/routes/post-routes";
import { CommentRoutes } from "./presentations/routes/comment-routes";

export const app = fastify({ logger: true });

/** Modules */
app.register(fastifyCookie);
app.register(fastifyCors, {
  origin: true,
  credentials: true,
  allowedHeaders: ["Content-Type"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
});
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "token",
    signed: false,
  },
});

/** Routes */
app.register(UserRoutes, { prefix: "/users" });
app.register(PostRoutes, { prefix: "/posts" });
app.register(CommentRoutes, { prefix: "/comments" });
