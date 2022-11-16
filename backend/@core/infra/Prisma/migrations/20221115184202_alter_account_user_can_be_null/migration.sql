-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_accountId_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "accountId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
