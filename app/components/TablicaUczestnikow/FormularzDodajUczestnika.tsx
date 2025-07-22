"use client";

import { useStatus } from "@/app/hooks/useStatus";
import { Uzytkownik } from "@/app/types/user";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";

interface Props {
  onDodanoAction: (nowy: Uzytkownik) => void;
}

export default function FormularzDodajUczestnika({ onDodanoAction }: Props) {
  const { data: statusOptions = [] } = useStatus();
  const [nameInput, setNameInput] = useState("");
  const [userTypeId, setUserTypeId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    console.log("Klik!");
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
    <div className="flex gap-2 py-2 flex-wrap items-end">
      <input
        type="text"
        placeholder="Imię lub wiele po przecinku"
        className="input input-bordered w-full max-w-sm"
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
        disabled={loading}
      />

      <select
        className="select select-bordered"
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
        className="btn btn-success"
        onClick={handleAdd}
        disabled={loading}
        title="Dodaj uczestnika"
      >
        <IoMdAdd />
      </button>
    </div>
  );
}
