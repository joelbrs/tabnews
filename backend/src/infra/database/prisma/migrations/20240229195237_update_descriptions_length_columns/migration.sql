/*
  Warnings:

  - You are about to alter the column `description` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10000)`.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_creator_id_fkey";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "description" SET DATA TYPE VARCHAR(1000);

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "description" SET DATA TYPE VARCHAR(10000);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "description" SET DATA TYPE VARCHAR(5000);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
