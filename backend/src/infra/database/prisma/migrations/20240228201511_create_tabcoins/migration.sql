-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "tabcoins" BIGINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "tabcoins" BIGINT NOT NULL DEFAULT 0;
