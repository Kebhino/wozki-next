"use client";

import { useUsers } from "@/app/hooks/useUsers";
import { useWybranyUserStore } from "@/app/stores/useWybranyUserObiekt";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  slotId: number;
}

export default function ZapiszRezygnujButton({ slotId }: Props) {
  const { user } = useWybranyUserStore();
  const [loading, setLoading] = useState(false);
  const { data: users = [], isLoading } = useUsers();
  const queryClient = useQueryClient();

  const userWybrany = users.find((u) => u.id === user?.id);
  const jestZapisany =
    userWybrany?.sloty.some((slot) => slot.id === slotId) ?? false;

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
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(jestZapisany ? "Zrezygnowano" : "Zapisano!");
    } else {
      toast.error("Błąd operacji");
    }

    setLoading(false);
  };

  if (!user || isLoading) {
    return (
      <div className="flex justify-center items-center h-6">
        <button className="btn btn-xs btn-warning btn-outline">
          Wybierz Uczestnika
        </button>
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
