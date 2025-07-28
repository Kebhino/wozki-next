-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dubbleSlots" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "monthlySlotsLimit" INTEGER NOT NULL DEFAULT 10;
