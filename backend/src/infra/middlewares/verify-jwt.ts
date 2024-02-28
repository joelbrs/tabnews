import { FastifyReply, FastifyRequest } from "fastify";

export const VerifyJwt = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    await request.jwtVerify({ onlyCookie: true });
  } catch (err) {
    return reply.status(401).send({ message: "Unauthorized" });
  }
};
