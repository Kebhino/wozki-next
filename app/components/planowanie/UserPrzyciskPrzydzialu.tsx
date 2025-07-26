"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

interface Props {
  userId: number;
  slotId: number;
  userName: string;
  czyPrzydzielony: boolean;
  onReloadAction: () => void;
}

export default function UserPrzyciskPrzydzialu({
  userId,
  slotId,
  userName,
  czyPrzydzielony,
  onReloadAction,
}: Props) {
  const [loading, setLoading] = useState(false);

  const togglePrzydzial = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/planowanie/`, {
        method: czyPrzydzielony ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, slotId }),
      });

      const json = await res.json();

      if (!res.ok) {
        toast.error(json.error || "Błąd przy zapisie");
      } else {
        onReloadAction();
      }
    } catch {
      toast.error("Błąd sieci");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`btn btn-xs ${
        czyPrzydzielony ? "btn-success" : "btn-outline"
      } ${loading ? "btn-disabled" : ""}`}
      onClick={togglePrzydzial}
    >
      {userName}
    </button>
  );
}
