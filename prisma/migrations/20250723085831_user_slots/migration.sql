-- CreateTable
CREATE TABLE "_Dostepnosc" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_Dostepnosc_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_Dostepnosc_B_index" ON "_Dostepnosc"("B");

-- AddForeignKey
ALTER TABLE "_Dostepnosc" ADD CONSTRAINT "_Dostepnosc_A_fkey" FOREIGN KEY ("A") REFERENCES "Slot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Dostepnosc" ADD CONSTRAINT "_Dostepnosc_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
