-- AlterTable
ALTER TABLE "body_metrics" ADD COLUMN     "arm" DOUBLE PRECISION,
ADD COLUMN     "chest" DOUBLE PRECISION,
ADD COLUMN     "hips" DOUBLE PRECISION,
ADD COLUMN     "leg" DOUBLE PRECISION,
ADD COLUMN     "waist" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "coach_notes" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coach_notes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "coach_notes_client_id_idx" ON "coach_notes"("client_id");

-- CreateIndex
CREATE INDEX "coach_notes_author_id_idx" ON "coach_notes"("author_id");

-- AddForeignKey
ALTER TABLE "coach_notes" ADD CONSTRAINT "coach_notes_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coach_notes" ADD CONSTRAINT "coach_notes_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
