"use client";

import { useEffect, useState } from "react";
import FormularzDodajUczestnika from "./FormularzDodajUczestnika";
import TabelaUczestnikow from "./TabelaUczestnikow";
import toast from "react-hot-toast";
import { Uzytkownik } from "@/app/types/user";
import { SortConfig } from "@/app/types/participants";

export default function TablicaUczestnikow() {
  const [participants, setParticipants] = useState<Uzytkownik[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    type: "surname",
    direction: "asc",
  });
  const [statusOptions, setStatusOptions] = useState<
    { id: number; type: string }[]
  >([]);

  // Pobieranie typów użytkownika
  useEffect(() => {
    fetch("/api/user-types")
      .then((res) => res.json())
      .then((data: { id: number; type: string }[]) => {
        setStatusOptions(data); // ⬅️ teraz typ się zgadza
      });
  }, []);

  return (
    <div className="p-4">
      <FormularzDodajUczestnika
        onDodano={(nowy: Uzytkownik) => {
          setParticipants((prev) => [...prev, nowy]);
          toast.success("Dodano uczestnika");
        }}
        statusOptions={statusOptions}
      />

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
