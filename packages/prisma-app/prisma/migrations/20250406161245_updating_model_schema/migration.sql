/*
  Warnings:

  - You are about to drop the column `balding` on the `Model` table. All the data in the column will be lost.
  - You are about to drop the column `ethnicity` on the `Model` table. All the data in the column will be lost.
  - Added the required column `bald` to the `Model` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ethinicity` to the `Model` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Model` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Model" DROP COLUMN "balding",
DROP COLUMN "ethnicity",
ADD COLUMN     "bald" BOOLEAN NOT NULL,
ADD COLUMN     "ethinicity" "ModelEthinicityEnum" NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;
