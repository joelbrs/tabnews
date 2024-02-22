-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'NORMAL');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "type" "UserType" NOT NULL DEFAULT 'NORMAL';
