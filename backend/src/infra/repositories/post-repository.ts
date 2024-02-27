import { Post, Prisma } from "@prisma/client";

export default interface PostRepository {
  create(data: Prisma.PostUncheckedCreateInput): Promise<Post>;
}
