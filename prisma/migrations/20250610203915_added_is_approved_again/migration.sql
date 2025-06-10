/*
  Warnings:

  - You are about to drop the column `isApproves` on the `Photo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "isApproves",
ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false;
