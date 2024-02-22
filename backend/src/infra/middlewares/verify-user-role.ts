import { FastifyReply, FastifyRequest } from "fastify";

export const VerifyUserRole = async (roleToValidate: "ADMIN" | "MEMBER") => {
  return (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user;

    if (role !== roleToValidate) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
  };
};
