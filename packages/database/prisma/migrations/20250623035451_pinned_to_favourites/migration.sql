/*
  Warnings:

  - You are about to drop the column `pinned` on the `Thought` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Thought" DROP COLUMN "pinned",
ADD COLUMN     "favourites" BOOLEAN NOT NULL DEFAULT false;
