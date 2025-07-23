"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  userId: number;
  slotId: number;
  zapisany: boolean; // czy użytkownik już zapisany?
}

export default function ZapiszRezygnujButton({
  userId,
  slotId,
  zapisany,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [jestZapisany, setJestZapisany] = useState(zapisany);

  const handleClick = async () => {
    setLoading(true);

    const method = jestZapisany ? "DELETE" : "POST";

    const res = await fetch("/api/dostepnosc", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, slotId }),
    });

    if (res.ok) {
      setJestZapisany(!jestZapisany);
      toast.success(jestZapisany ? "Zrezygnowano" : "Zapisano!");
    } else {
      toast.error("Błąd");
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`btn btn-xs ${
        jestZapisany ? "btn-outline btn-error" : "btn-outline btn-success"
      }`}
    >
      {loading ? "..." : jestZapisany ? "Zrezygnuj" : "Zapisz"}
    </button>
  );
}
