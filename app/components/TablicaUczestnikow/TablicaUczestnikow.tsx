"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import FormularzDodajUczestnika from "./FormularzDodajUczestnika";
import TabelaUczestnikow from "./TabelaUczestnikow";
import { SortConfig } from "@/app/types/participants";
import { getParticipants, getUserTypes } from "@/lib/users";

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
  } = useQuery({
    queryKey: ["participants"],
    queryFn: getParticipants,
  });

  // ✅ Pobieranie statusów
  const {
    data: statusOptions = [],
    isLoading: isLoadingStatus,
    isError: isErrorStatus,
  } = useQuery({
    queryKey: ["statusOptions"],
    queryFn: getUserTypes,
  });

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
          <FormularzDodajUczestnika
            onDodano={handleDodano}
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
        </>
      )}
    </div>
  );
}
