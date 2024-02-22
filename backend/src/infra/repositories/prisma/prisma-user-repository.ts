import { $Enums, Prisma, PrismaClient } from "@prisma/client";
import UserRepository from "../user-repository";

export default class PrismaUserRepository implements UserRepository {
  constructor(private readonly _client: PrismaClient) {}

  async create(data: Prisma.UserCreateInput) {
    return await this._client.user.create({ data });
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    return await this._client.user.update({ where: { id }, data });
  }

  async findByEmail(email: string) {
    return await this._client.user.findUnique({ where: { email } });
  }
}
