/*
  Warnings:

  - You are about to drop the column `subcomment_id` on the `Comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_subcomment_id_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "subcomment_id",
ADD COLUMN     "comment_id" TEXT;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
