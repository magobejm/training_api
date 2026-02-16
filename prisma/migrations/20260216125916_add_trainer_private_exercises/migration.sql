/*
  Warnings:

  - You are about to drop the column `muscle_group` on the `exercises` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - Made the column `muscle_group_id` on table `exercises` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role_id` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "exercises" DROP CONSTRAINT "exercises_muscle_group_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_role_id_fkey";

-- AlterTable
ALTER TABLE "exercises" DROP COLUMN "muscle_group",
ADD COLUMN     "trainer_id" TEXT,
ALTER COLUMN "muscle_group_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ALTER COLUMN "role_id" SET NOT NULL;

-- DropEnum
DROP TYPE "RoleEnum";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_muscle_group_id_fkey" FOREIGN KEY ("muscle_group_id") REFERENCES "muscle_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_trainer_id_fkey" FOREIGN KEY ("trainer_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
