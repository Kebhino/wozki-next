-- CreateTable
CREATE TABLE "Przydzial" (
    "userId" INTEGER NOT NULL,
    "slotId" INTEGER NOT NULL,

    CONSTRAINT "Przydzial_pkey" PRIMARY KEY ("userId","slotId")
);

-- AddForeignKey
ALTER TABLE "Przydzial" ADD CONSTRAINT "Przydzial_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Przydzial" ADD CONSTRAINT "Przydzial_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "Slot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
