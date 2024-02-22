import { Prisma, User } from "@prisma/client";

export default interface UserRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
}
