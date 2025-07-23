"use client";

import { useUsers } from "@/app/hooks/useUsers";
import { useState } from "react";

export default function WyborUczestnikaClient() {
  const { data: users = [] } = useUsers();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="bg-base-200 p-4 rounded-xl shadow-md mb-4 text-center">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Wybierz uczestnika</span>
        </label>
        <select
          className="select select-sm select-bordered ml-3"
          value={selectedId ?? ""}
          onChange={(e) => setSelectedId(parseInt(e.target.value))}
        >
          <option disabled value="">
            -- wybierz --
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
