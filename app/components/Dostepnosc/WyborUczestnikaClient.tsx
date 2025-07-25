"use client";

import { useUsers } from "@/app/hooks/useUsers";
import { useWybranyUserStore } from "@/app/stores/useWybranyUserObiekt";

export default function WyborUczestnikaClient() {
  const { data: users = [] } = useUsers();
  const { user, ustawUsera, ustawLoadingUser } = useWybranyUserStore();

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(e.target.value);
    const user = users.find((user) => user.id === id) ?? null;

    ustawUsera(user);
    ustawLoadingUser(true);

    if (user) {
      const res = await fetch(`/api/users/${id}`);
      const fullUser = await res.json();
      ustawUsera(fullUser);
    }
    ustawLoadingUser(false);
  };

  return (
    <div className="bg-base-200 p-4 rounded-xl shadow-md mb-4 text-center">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Wybierz uczestnika</span>
        </label>
        <select
          className="select select-sm select-bordered ml-3"
          value={user?.id ?? ""}
          onChange={handleChange}
        >
          <option disabled value="">
            -- wybierz --
          </option>
          {[...users]
            .filter((user) => user.active)
            .sort((a, b) => {
              const nazwiskoA = a.name.split(" ").slice(-1)[0];
              const nazwiskoB = b.name.split(" ").slice(-1)[0];
              return nazwiskoA.localeCompare(nazwiskoB);
            })
            .map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}
