"use Client";

import { QueryClient, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";

const FormularzDodawaniaTypow = () => {
  const queryClient = useQueryClient();
  const [nowyTyp, setNowyTyp] = useState("");
  const [dodawanie, setDodawanie] = useState(Boolean);

  const handleClick = async () => {
    if (!nowyTyp.trim()) {
      toast.error("Podaj nazwę typu");
      return;
    }

    setDodawanie(true);

    try {
      const res = await fetch("/api/user-types", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: nowyTyp }),
      });

      if (!res.ok) {
        toast.error("Nie udało się dodać typu");
        return;
      }

      toast.success("Dodano typ");
      setNowyTyp("");
      queryClient.invalidateQueries({ queryKey: ["types"] });
    } catch {
      toast.error("Błąd połączenia z serwerem");
    } finally {
      setDodawanie(false);
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        className="input input-bordered w-full max-w-xs"
        placeholder="Nowa lokalizacja"
        value={nowyTyp}
        onChange={(e) => setNowyTyp(e.target.value)}
      />
      <button
        className="btn btn-success"
        onClick={handleClick}
        disabled={dodawanie}
      >
        {dodawanie ? "Dodawanie..." : "Dodaj"}
      </button>
    </div>
  );
};

export default FormularzDodawaniaTypow;
