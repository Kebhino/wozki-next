"use client";

import { Slot, Location } from "@/app/generated/prisma";
import WierszSlotu from "./WierszSlota";
import SortableColumnHeader from "./SortableColumnHeader";
import { SortConfig, SortKey } from "./TablicaSlotow";
import { Loader2 } from "lucide-react";

interface Props {
  sloty: Slot[];
  lokalizacje: Location[];
  sortConfig: SortConfig;
  onSortChangeAction: (type: SortKey) => void;
  isLoading: boolean;
}

export default function TabelaSlotow({
  sloty = [],
  lokalizacje = [],
  sortConfig,
  onSortChangeAction,
  isLoading,
}: Props) {
  const sortedSloty = [...sloty].sort((a, b) => {
    const { type, direction } = sortConfig;
    let valA: string | number = 0;
    let valB: string | number = 0;

    if (type === "data") {
      valA = new Date(a.data).getTime() + a.from * 3600000;
      valB = new Date(b.data).getTime() + b.from * 3600000;
    } else if (type === "godzina") {
      valA = a.from;
      valB = b.from;
    } else if (type === "slot") {
      valA =
        lokalizacje.find((l) => l.id === a.locationId)?.name.toLowerCase() ||
        "";
      valB =
        lokalizacje.find((l) => l.id === b.locationId)?.name.toLowerCase() ||
        "";
    }

    if (typeof valA === "string" && typeof valB === "string") {
      return direction === "asc"
        ? valA.localeCompare(valB, "pl")
        : valB.localeCompare(valA, "pl");
    } else {
      return direction === "asc"
        ? Number(valA) - Number(valB)
        : Number(valB) - Number(valA);
    }
  });

  return (
    <div className="overflow-x-auto mt-4 rounded-md shadow-sm">
      <table className="table table-xs w-full bg-base-200 text-base-content">
        <thead className="bg-base-300 text-base-content">
          <tr>
            <th>
              <SortableColumnHeader
                label="Lokalizacja"
                sortKey="slot"
                currentSort={sortConfig.type}
                sortAsc={sortConfig.direction === "asc"}
                onSortChange={onSortChangeAction}
              />
            </th>
            <th>
              <SortableColumnHeader
                label="Data"
                sortKey="data"
                currentSort={sortConfig.type}
                sortAsc={sortConfig.direction === "asc"}
                onSortChange={onSortChangeAction}
              />
            </th>
            <th className="text-center">
              <SortableColumnHeader
                label="Godzina"
                sortKey="godzina"
                currentSort={sortConfig.type}
                sortAsc={sortConfig.direction === "asc"}
                onSortChange={onSortChangeAction}
              />
            </th>
            <th className="text-center">Aktywny</th>
            <th className="text-center">Akcje</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={5} className="text-center py-6">
                <Loader2 className="animate-spin mx-auto" />
              </td>
            </tr>
          ) : (
            sortedSloty.map((slot) => (
              <WierszSlotu
                key={slot.id}
                slot={slot}
                lokalizacje={lokalizacje}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
