"use client";

import { Participant, SortConfig, Status } from "../../types/participants";
import SortableColumnHeader from "./SortableColumnHeader";
import WierszUczestnika from "./WierszUczestnika";

interface Props {
  participants: Participant[];
  sortConfig: SortConfig;
  onSortChange: (type: "surname" | "status") => void;
  statusOptions: Status[];
}

export default function TabelaUczestnikow({
  participants,
  sortConfig,
  onSortChange,
  statusOptions,
}: Props) {
  const sorted = [...participants].sort((a, b) => {
    const { type, direction } = sortConfig;

    const valA =
      type === "surname"
        ? a.name.split(" ").slice(-1)[0].toLowerCase()
        : a.status.toLowerCase();

    const valB =
      type === "surname"
        ? b.name.split(" ").slice(-1)[0].toLowerCase()
        : b.status.toLowerCase();

    return direction === "asc"
      ? valA.localeCompare(valB, "pl")
      : valB.localeCompare(valA, "pl");
  });

  return (
    <div className="overflow-x-auto mt-4 rounded-md shadow-sm">
      <table className="table table-xs w-full bg-base-200 text-base-content">
        <thead className="bg-base-300 text-base-content">
          <tr>
            <th>
              <SortableColumnHeader
                label="Imię i nazwisko"
                sortKey="surname"
                currentSort={sortConfig.type}
                sortAsc={sortConfig.direction === "asc"}
                onSortChange={onSortChange}
              />
            </th>
            <th>
              <SortableColumnHeader
                label="Status"
                sortKey="status"
                currentSort={sortConfig.type}
                sortAsc={sortConfig.direction === "asc"}
                onSortChange={onSortChange}
              />
            </th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((p) => (
            <WierszUczestnika
              key={p.id}
              participant={p}
              statusOptions={statusOptions}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
