import { Comment, Prisma } from "@prisma/client";

export default interface CommentRepository {
  create(data: Prisma.CommentUncheckedCreateInput): Promise<Comment>;
  findById(id: string): Promise<Comment | null>;
  createSubComment(
    id: string,
    data: Prisma.CommentUncheckedCreateInput
  ): Promise<Comment>;
  delete(id: string): Promise<void>;
}
