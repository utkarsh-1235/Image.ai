-- CreateEnum
CREATE TYPE "ModelTrainingStatusEnum" AS ENUM ('Pending', 'Generated', 'Failed');

-- AlterTable
ALTER TABLE "Model" ADD COLUMN     "tensorPath" TEXT,
ADD COLUMN     "trainingStatus" "ModelTrainingStatusEnum" NOT NULL DEFAULT 'Pending',
ADD COLUMN     "triggerFlow" TEXT;

-- AlterTable
ALTER TABLE "OutputImages" ALTER COLUMN "imageUrl" SET DEFAULT '';
