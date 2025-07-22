"use client";

import { useUserTypes } from "@/app/hooks/useUserTypes";
import { Uzytkownik } from "@/app/types/user";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";

interface Props {
  onDodanoAction: (nowy: Uzytkownik) => void;
}

export default function FormularzDodajUczestnika({ onDodanoAction }: Props) {
  const queryClient = useQueryClient();
  const { data: statusOptions = [] } = useUserTypes();
  const [nameInput, setNameInput] = useState("");
  const [userTypeId, setUserTypeId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!nameInput.trim() || !userTypeId) {
      toast.error("Uzupełnij imię i wybierz status");
      return;
    }

    const names = nameInput
      .split(",")
      .map((n) => n.trim())
      .filter(Boolean);

    try {
      setLoading(true);
      for (const name of names) {
        const res = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, userTypeId }),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Błąd dodawania");
        }

        const nowy = await res.json();
        onDodanoAction(nowy);
      }

      toast.success(
        names.length > 1
          ? `Dodano ${names.length} uczestników`
          : "Dodano uczestnika"
      );
      queryClient.invalidateQueries({ queryKey: ["users"] });

      setNameInput("");
      setUserTypeId(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Wystąpił nieznany błąd");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:gap-3 gap-2 py-2">
      <input
        type="text"
        placeholder="Imię lub wiele po przecinku"
        className="input input-bordered w-full sm:max-w-sm"
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
        disabled={loading}
      />

      <select
        className="select select-bordered w-full sm:w-auto"
        value={userTypeId ?? ""}
        onChange={(e) => setUserTypeId(Number(e.target.value))}
        disabled={loading}
      >
        <option value="" disabled>
          Wybierz status
        </option>
        {statusOptions.map((status) => (
          <option key={status.id} value={status.id}>
            {status.type}
          </option>
        ))}
      </select>

      <button
        className="btn btn-success w-full sm:w-auto"
        onClick={handleAdd}
        disabled={loading}
        title="Dodaj uczestnika"
      >
        <IoMdAdd />
      </button>
    </div>
  );
}
