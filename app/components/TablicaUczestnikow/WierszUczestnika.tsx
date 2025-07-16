"use client";

import { Participant, Status } from "../../types/participants";
import { useEdytowanePolaMapa } from "../../stores/useEdytowanePolaMapa";
import { useGlobalDialogStore } from "../../stores/useGlobalDialogStore";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import DialogUsuniecia from "./DialogUsuniecia";
import { Trash } from "lucide-react";

// 🧪 Mock funkcji aktualizacji
const updateParticipantInDbMock = async (
  id: string,
  field: keyof Participant,
  value: string | boolean
) => {
  await new Promise((res) => setTimeout(res, 300));
  console.log(`(Mock) Zaktualizowano uczestnika ${id}: ${field} = ${value}`);
};

interface Props {
  participant: Participant;
  statusOptions: Status[];
}

export default function WierszUczestnika({
  participant,
  statusOptions,
}: Props) {
  const queryClient = useQueryClient();
  const { dodajPoleDoMapy, sprawdzCzyEdytowane, usunPoleZMapy } =
    useEdytowanePolaMapa();
  const { setIdDoUsuniecia, idDoUsuniecia } = useGlobalDialogStore();

  const [isUpdating, setIsUpdating] = useState(false);
  const [trybEdycji, setTrybEdycji] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        trybEdycji &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        handleUpdate("name", inputRef.current.value);
        setTrybEdycji(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [trybEdycji]);

  const handleUpdate = async (
    field: keyof Participant,
    value: string | boolean
  ) => {
    dodajPoleDoMapy(participant.id, field);
    setIsUpdating(true);
    try {
      await updateParticipantInDbMock(participant.id, field, value); // 🧪
      toast.success("Zaktualizowano (mock)");
      queryClient.invalidateQueries({ queryKey: ["participants"] });
    } catch {
      toast.error("Błąd aktualizacji (mock)");
    } finally {
      usunPoleZMapy(participant.id, field);
      setIsUpdating(false);
    }
  };

  return (
    <tr className="hover">
      {/* Imię i nazwisko */}
      <td>
        {sprawdzCzyEdytowane(participant.id, "name") ? (
          <span className="loading loading-spinner loading-sm text-primary" />
        ) : trybEdycji ? (
          <input
            ref={inputRef}
            autoFocus
            defaultValue={participant.name}
            className="input input-sm w-full max-w-[160px] bg-base-100 shadow-sm rounded-md px-2 py-1 border border-base-300 focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50 transition-all"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleUpdate("name", (e.target as HTMLInputElement).value);
                setTrybEdycji(false);
              }
              if (e.key === "Escape") {
                setTrybEdycji(false);
              }
            }}
          />
        ) : (
          <span
            className="cursor-pointer truncate max-w-[160px] inline-block"
            onClick={() => setTrybEdycji(true)}
          >
            {participant.name}
          </span>
        )}
      </td>

      {/* Status + aktywność */}
      <td>
        <div className="flex gap-2 items-center">
          {sprawdzCzyEdytowane(participant.id, "status") ? (
            <span className="loading loading-spinner loading-sm text-primary" />
          ) : (
            <select
              className="select select-bordered select-sm w-[110px]"
              defaultValue={participant.status}
              onChange={(e) => handleUpdate("status", e.target.value)}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          )}

          {sprawdzCzyEdytowane(participant.id, "active") ? (
            <span className="loading loading-spinner loading-sm text-primary" />
          ) : (
            <input
              type="checkbox"
              className="toggle toggle-success"
              checked={participant.active}
              onChange={(e) => {
                dodajPoleDoMapy(participant.id, "active");
                handleUpdate("active", e.target.checked).finally(() =>
                  usunPoleZMapy(participant.id, "active")
                );
              }}
            />
          )}
        </div>
      </td>

      {/* Akcje */}
      <td>
        <button
          className="btn btn-sm btn-outline btn-error rounded-lg"
          disabled={isUpdating}
          onClick={() => setIdDoUsuniecia(participant.id)}
        >
          <Trash className="w-4 h-4" size={16} />
        </button>
        {idDoUsuniecia === participant.id && (
          <DialogUsuniecia participant={participant} />
        )}
      </td>
    </tr>
  );
}
