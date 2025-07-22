"use client";

import FormularzDodawaniaSlotu from "./FormularzDodawaniaSlotu";
import { useSloty } from "@/app/hooks/useSlots";
import { useLokalizacje } from "@/app/hooks/useLocations";
import TabelaSlotow from "./TabelaSlotow";
import { useState } from "react";

export type SortKey = "slot" | "data" | "godzina";
export interface SortConfig {
  type: SortKey;
  direction: "asc" | "desc";
}

export default function TablicaSlotow() {
  const { data: sloty = [], isLoading } = useSloty();
  const { data: lokalizacje = [] } = useLokalizacje();
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    type: "data",
    direction: "asc",
  });

  const handleSortChange = (type: SortKey) => {
    setSortConfig((prev) =>
      prev.type === type
        ? { ...prev, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { type, direction: "asc" }
    );
  };

  return (
    <div className="w-full px-2 sm:px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <FormularzDodawaniaSlotu />
        <div className="overflow-x-auto">
          <TabelaSlotow
            sloty={sloty}
            lokalizacje={lokalizacje}
            sortConfig={sortConfig}
            onSortChangeAction={handleSortChange}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
