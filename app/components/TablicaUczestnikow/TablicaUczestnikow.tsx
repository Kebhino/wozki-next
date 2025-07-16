"use client";

import { useState } from "react";
import { Participant, SortConfig, Status } from "@/app/types/participants";
import FormularzDodajUczestnika from "./FormularzDodajUczestnika";
import TabelaUczestnikow from "./TabelaUczestnikow";
import toast from "react-hot-toast";

// ✅ MOCK danych
const MOCK_PARTICIPANTS: Participant[] = [
  { id: "1", name: "Jan Kowalski", status: "Głosiciel", active: true },
  { id: "2", name: "Anna Nowak", status: "Pionier St.", active: false },
];

const statusOptions: Status[] = ["Pionier St.", "Pionier Pom.", "Głosiciel"];

export default function TablicaUczestnikow() {
  const [participants, setParticipants] =
    useState<Participant[]>(MOCK_PARTICIPANTS);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    type: "surname",
    direction: "asc",
  });

  return (
    <div className="p-4">
      {/* Formularz tymczasowo wyłączony */}
      {/* <FormularzDodajUczestnika ... /> */}

      <TabelaUczestnikow
        participants={participants}
        sortConfig={sortConfig}
        onSortChange={(type) => {
          setSortConfig((prev) => ({
            type,
            direction:
              prev.type === type
                ? prev.direction === "asc"
                  ? "desc"
                  : "asc"
                : "asc",
          }));
        }}
        statusOptions={statusOptions}
      />
    </div>
  );
}
