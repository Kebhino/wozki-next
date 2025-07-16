"use client";

import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import {
  AddParticipantProps,
  Participant,
  Status,
} from "../../types/participants";
import toast from "react-hot-toast";

interface Props {
  onLoadingChange: (state: boolean) => void;
  statusOptions: Status[];
}

// 🧪 Tymczasowa funkcja zamiast prawdziwego API
const addParticipantMock = async (participant: AddParticipantProps) => {
  await new Promise((res) => setTimeout(res, 300));
  console.log("(Mock) Dodano uczestnika:", participant);
};

export default function FormularzDodajUczestnika({
  onLoadingChange,
  statusOptions,
}: Props) {
  const queryClient = useQueryClient();
  const [newParticipant, setNewParticipant] = useState<Omit<Participant, "id">>(
    {
      name: "",
      status: "Głosiciel",
      active: true,
    }
  );

  const handleAddParticipant = async () => {
    if (!newParticipant.name.trim()) {
      toast.error("Podaj imię i nazwisko");
      return;
    }

    const names = newParticipant.name
      .split(",")
      .map((n) => n.trim())
      .filter(Boolean);

    try {
      onLoadingChange(true);
      for (const name of names) {
        const payload: AddParticipantProps = {
          id: uuidv4(),
          active: newParticipant.active,
          name,
          status: newParticipant.status,
        };
        await addParticipantMock(payload); // 🧪 użycie mocka
      }

      toast.success(
        names.length > 1
          ? `Dodano ${names.length} uczestników (mock)`
          : "Dodano uczestnika (mock)"
      );

      queryClient.invalidateQueries({ queryKey: ["participants"] });
      setNewParticipant({ name: "", status: "Głosiciel", active: true });
    } catch (err) {
      toast.error("Błąd dodawania (mock)");
      console.error(err);
    } finally {
      onLoadingChange(false);
    }
  };

  return (
    <div className="flex gap-2 py-2 flex-wrap">
      <input
        type="text"
        placeholder="Nowy uczestnik lub wielu po przecinku"
        className="input input-bordered w-full max-w-sm"
        value={newParticipant.name}
        onChange={(e) =>
          setNewParticipant((prev) => ({ ...prev, name: e.target.value }))
        }
      />

      <select
        className="select select-bordered"
        value={newParticipant.status}
        onChange={(e) =>
          setNewParticipant((prev) => ({
            ...prev,
            status: e.target.value as Status,
          }))
        }
      >
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <button
        className="btn btn-outline btn-success"
        onClick={handleAddParticipant}
      >
        <IoMdAdd />
      </button>
    </div>
  );
}
