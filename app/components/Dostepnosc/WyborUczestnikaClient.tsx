"use client";

import { useUsers } from "@/app/hooks/useUsers";
import { useWybranyUzytkownik } from "@/app/stores/useWybranyUserId";
import { useWybranyUserStore } from "@/app/stores/useWybranyUserObiekt";
import { useState } from "react";

export default function WyborUczestnikaClient() {
  const { data: users = [] } = useUsers();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { ustawUzytkownika } = useWybranyUzytkownik();
  const { ustawUsera } = useWybranyUserStore();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(e.target.value);
    const user = users.find((user) => user.id === id) ?? null;

    setSelectedId(id);
    ustawUzytkownika(id);
    ustawUsera(user);
  };

  return (
    <div className="bg-base-200 p-4 rounded-xl shadow-md mb-4 text-center">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Wybierz uczestnika</span>
        </label>
        <select
          className="select select-sm select-bordered ml-3"
          value={selectedId ?? ""}
          onChange={handleChange}
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
