"use client";

import { Uzytkownik } from "@/app/types/user";
import { useEdytowanePolaMapa } from "../../stores/useEdytowanePolaMapa";
import { useGlobalDialogStore } from "../../stores/useGlobalDialogStore";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import DialogUsuniecia from "./DialogUsuniecia";
import { Trash } from "lucide-react";

// ✅ Tu w przyszłości zaimplementuj faktyczne API
const updateUzytkownikWbazie = async (
  id: number,
  field: keyof Uzytkownik,
  value: string | boolean | number
) => {
  await new Promise((res) => setTimeout(res, 300)); // Tymczasowy delay
  console.log(`Zaktualizowano ${id}: ${field} = ${value}`);
};

interface Props {
  participant: Uzytkownik;
  statusOptions: { id: number; type: string }[];
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
    field: keyof Uzytkownik,
    value: string | boolean | number
  ) => {
    dodajPoleDoMapy(participant.id, field);
    setIsUpdating(true);
    try {
      await updateUzytkownikWbazie(participant.id, field, value);
      toast.success("Zaktualizowano");
      queryClient.invalidateQueries({ queryKey: ["participants"] });
    } catch {
      toast.error("Błąd aktualizacji");
    } finally {
      usunPoleZMapy(participant.id, field);
      setIsUpdating(false);
    }
  };

  return (
    <tr className="hover">
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

      <td>
        <div className="flex gap-2 items-center">
          {sprawdzCzyEdytowane(participant.id, "userTypeId") ? (
            <span className="loading loading-spinner loading-sm text-primary" />
          ) : (
            <select
              className="select select-bordered select-sm w-[110px]"
              defaultValue={participant.userTypeId ?? ""}
              onChange={(e) =>
                handleUpdate("userTypeId", parseInt(e.target.value, 10))
              }
            >
              <option value="" disabled>
                Wybierz...
              </option>
              {statusOptions.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.type}
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
              onChange={(e) => handleUpdate("active", e.target.checked)}
            />
          )}
        </div>
      </td>

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
