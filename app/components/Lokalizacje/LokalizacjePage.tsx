"use client";

import { useLokalizacje } from "@/app/hooks/useLocations";
import { SortConfigLokalizacje } from "@/app/types/sortowanieLokalizacje";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";
import FormularzDodawania from "./FormularzDodawaniaLokalizacji";
import SortableColumnHeader from "./SortableColumnHeaderLokalizacje";
import WierszLokalizacji from "./WierszLokalizacji";

export default function LokalizacjePage() {
  const queryClient = useQueryClient();
  const { data: lokalizacje = [], isLoading, isError } = useLokalizacje();
  const [dodawanie, setDodawanie] = useState(false);
  const [sortConfig, setSortConfig] = useState<SortConfigLokalizacje>({
    type: "name",
    direction: "asc",
  });

  const dodajLokalizacje = async (nazwa: string) => {
    if (!nazwa.trim()) {
      toast.error("Podaj nazwę lokalizacji");
      return;
    }

    setDodawanie(true);

    try {
      const res = await fetch("/api/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nazwa }),
      });

      if (res.ok) {
        toast.success("Dodano lokalizację");
        queryClient.invalidateQueries({ queryKey: ["lokalizacje"] });
      } else {
        toast.error("Błąd dodawania lokalizacji");
      }
    } catch {
      toast.error("Błąd połączenia z serwerem");
    } finally {
      setDodawanie(false);
    }
  };

  const sortedLokalizacje = [...lokalizacje].sort((a, b) => {
    const { type, direction } = sortConfig;

    const valA = type === "name" ? a.name.toLowerCase() : a.active.toString();
    const valB = type === "name" ? b.name.toLowerCase() : b.active.toString();

    return direction === "asc"
      ? valA.localeCompare(valB, "pl")
      : valB.localeCompare(valA, "pl");
  });

  const handleSortChange = (type: "name" | "status") => {
    setSortConfig((prev) => ({
      type,
      direction:
        prev.type === type && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div className="p-4">
      <FormularzDodawania
        onAddAction={dodajLokalizacje}
        dodawanie={dodawanie}
      />

      {isLoading ? (
        <p>Ładowanie lokalizacji...</p>
      ) : isError ? (
        <p>Błąd ładowania danych</p>
      ) : (
        <div className="overflow-x-auto mt-4 rounded-md shadow-sm">
          <table className="table table-xs w-full bg-base-200 text-base-content">
            <thead className="bg-base-300 text-base-content">
              <tr>
                <th>
                  <SortableColumnHeader
                    label="Lokalizacja"
                    sortKey="name"
                    currentSort={sortConfig.type}
                    sortAsc={sortConfig.direction === "asc"}
                    onSortChange={handleSortChange}
                  />
                </th>
                <th>
                  <SortableColumnHeader
                    label="Status"
                    sortKey="status"
                    currentSort={sortConfig.type}
                    sortAsc={sortConfig.direction === "asc"}
                    onSortChange={handleSortChange}
                  />
                </th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {sortedLokalizacje.map((lokalizacja) => (
                <WierszLokalizacji
                  key={lokalizacja.id}
                  lokalizacja={lokalizacja}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
