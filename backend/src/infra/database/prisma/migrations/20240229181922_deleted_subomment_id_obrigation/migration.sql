-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_subcomment_id_fkey";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "subcomment_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_subcomment_id_fkey" FOREIGN KEY ("subcomment_id") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
