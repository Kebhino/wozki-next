"use client";

import { User, UserType, Slot } from "@/app/generated/prisma";
import { SortConfig } from "@/app/types/sortowanieUczestnicy"; // ten może zostać jeśli dalej go używasz
import SortableColumnHeader from "./SortableColumnHeader";
import WierszUczestnika from "./WierszUczestnika";

export type UserZTypem = User & {
  UserType: UserType;
  sloty: Slot[];
};

interface Props {
  users: UserZTypem[];
  sortConfig: SortConfig;
  onSortChangeAction: (type: "surname" | "status") => void;
  statusOptions: UserType[];
}

export default function TabelaUczestnikow({
  users = [],
  sortConfig,
  statusOptions,
  onSortChangeAction,
}: Props) {
  const sortedUsers = [...users].sort((a, b) => {
    const { type, direction } = sortConfig;

    const valA =
      type === "surname"
        ? a.name?.split(" ").slice(-1)[0].toLowerCase() ?? ""
        : a.UserType?.type.toLowerCase() ?? "";

    const valB =
      type === "surname"
        ? b.name?.split(" ").slice(-1)[0].toLowerCase() ?? ""
        : b.UserType?.type.toLowerCase() ?? "";

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
                onSortChange={onSortChangeAction}
              />
            </th>
            <th>
              <SortableColumnHeader
                label="Typ"
                sortKey="status"
                currentSort={sortConfig.type}
                sortAsc={sortConfig.direction === "asc"}
                onSortChange={onSortChangeAction}
              />
            </th>
            <th>Aktywny</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <WierszUczestnika
              key={user.id}
              participant={user}
              statusOptions={statusOptions}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
