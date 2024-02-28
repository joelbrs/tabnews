import UserService from "../../application/services/user-service";
import PrismaUserRepository from "../../infra/repositories/prisma/prisma-user-repository";
import { prisma } from "../../infra/utils/prisma";
import UserController from "../../presentations/controllers/user-controller";

export const UserFactory = () => {
  return new UserController(FactoryUserService());
};

export const FactoryUserService = () => {
  const repository = new PrismaUserRepository(prisma);
  return new UserService(repository);
};
