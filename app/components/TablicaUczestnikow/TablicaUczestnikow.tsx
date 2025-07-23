"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { SortConfig } from "@/app/types/sortowanieUczestnicy";
import FormularzDodajUczestnika from "./FormularzDodajUczestnika";
import TabelaUczestnikow from "./TabelaUczestnikow";
import { useUserTypes } from "@/app/hooks/useUserTypes";
import { useUsers } from "@/app/hooks/useUsers";

export default function TablicaUczestnikow() {
  const queryClient = useQueryClient();

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    type: "surname",
    direction: "asc",
  });

  // ✅ Pobieranie uczestników
  const {
    data: participants = [],
    isLoading: isLoadingParticipants,
    isError: isErrorParticipants,
  } = useUsers();

  // ✅ Pobieranie statusów
  const {
    data: statusOptions = [],
    isLoading: isLoadingStatus,
    isError: isErrorStatus,
  } = useUserTypes();

  const handleDodano = () => {
    toast.success("Dodano uczestnika");
    queryClient.invalidateQueries({ queryKey: ["participants"] });
  };

  return (
    <div className="p-4">
      {isLoadingParticipants || isLoadingStatus ? (
        <p className="text-sm opacity-60">Ładowanie danych...</p>
      ) : isErrorParticipants || isErrorStatus ? (
        <p className="text-error">Błąd ładowania danych</p>
      ) : (
        <>
          <FormularzDodajUczestnika onDodanoAction={handleDodano} />

          <TabelaUczestnikow
            users={participants}
            sortConfig={sortConfig}
            statusOptions={statusOptions}
            onSortChangeAction={(type) => {
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
          />
        </>
      )}
    </div>
  );
}
