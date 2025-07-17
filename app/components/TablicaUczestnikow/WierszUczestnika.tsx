"use client";

import { User, UserType } from "@/app/generated/prisma";
import { useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useGlobalDialogStore } from "../../stores/useGlobalDialogStore";
import DialogUsuniecia from "./DialogUsuniecia";
import { UserZTypem } from "./TabelaUczestnikow";

interface Props {
  participant: UserZTypem;
  statusOptions: UserType[];
}

export default function WierszUczestnika({
  participant,
  statusOptions,
}: Props) {
  const queryClient = useQueryClient();
  const { setIdDoUsuniecia, idDoUsuniecia } = useGlobalDialogStore();

  const [trybEdycji, setTrybEdycji] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpdate = useCallback(
    async (field: keyof User, value: string | number | boolean) => {
      try {
        const res = await fetch(`/api/users`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: participant.id, field, value }),
        });

        if (!res.ok) throw new Error("Błąd aktualizacji");

        queryClient.invalidateQueries({ queryKey: ["participants"] });
      } catch {
        toast.error("Błąd aktualizacji");
      }
    },
    [participant.id, queryClient]
  );

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
  }, [trybEdycji, handleUpdate]);

  return (
    <tr className="hover">
      <td>
        {trybEdycji ? (
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

          <input
            type="checkbox"
            className="toggle toggle-success"
            checked={participant.active}
            onChange={(e) => handleUpdate("active", e.target.checked)}
          />
        </div>
      </td>

      <td>
        <button
          className="btn btn-sm btn-outline btn-error rounded-lg"
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
