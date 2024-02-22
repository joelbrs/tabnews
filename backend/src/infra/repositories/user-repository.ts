import { Prisma, User } from "@prisma/client";

export default interface UserRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  update(id: string, data: Prisma.UserUpdateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
