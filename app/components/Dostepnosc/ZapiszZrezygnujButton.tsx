"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useWybranyUserStore } from "@/app/stores/useWybranyUserObiekt";

interface Props {
  slotId: number;
}

export default function ZapiszRezygnujButton({ slotId }: Props) {
  const { user, ustawUsera, loadingUser } = useWybranyUserStore();
  const [loading, setLoading] = useState(false);
  const [jestZapisany, setJestZapisany] = useState(false);

  useEffect(() => {
    if (user) {
      setJestZapisany(user.sloty.some((slot) => slot.id === slotId));
    }
  }, [user, slotId]);

  const handleClick = async () => {
    if (!user) return;
    setLoading(true);

    const method = jestZapisany ? "DELETE" : "POST";

    const res = await fetch("/api/dostepnosc", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, slotId }),
    });

    if (res.ok) {
      toast.success(jestZapisany ? "Zrezygnowano" : "Zapisano!");
      setJestZapisany(!jestZapisany);

      const updated = await fetch(`/api/users/${user.id}`);
      const newUser = await updated.json();
      ustawUsera(newUser);
    } else {
      toast.error("Błąd operacji");
    }

    setLoading(false);
  };

  // 🧠 Tu dodajemy ten warunek:
  if (!user || loadingUser) {
    return (
      <div className="flex justify-center items-center h-6">
        <span className="loading loading-spinner loading-xs" />
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`btn btn-xs ${
        jestZapisany ? "btn-outline btn-error" : "btn-outline btn-success"
      }`}
    >
      {loading ? (
        <span className="loading loading-spinner loading-xs" />
      ) : jestZapisany ? (
        "Zrezygnuj"
      ) : (
        "Zapisz"
      )}
    </button>
  );
}
