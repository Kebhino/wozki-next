"use client";

import { User, UserType } from "@/app/generated/prisma";
import { useEdytowanePolaMapa } from "@/app/stores/useEdytowanePolaMapa";
import { useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useGlobalDialogStore } from "../../stores/useGlobalDialogStore";
import DialogUsuniecia from "./DialogUsuniecia";
import { UserZTypem } from "./TabelaUczestnikow";
import { useStatus } from "@/app/hooks/useStatus";

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
  const { dodajPoleDoMapy, usunPoleZMapy, sprawdzCzyEdytowane } =
    useEdytowanePolaMapa();
  const [usunWTrakcie, setUsunWTrakcie] = useState<number | null>(null);

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

  return (
    <tr className="hover">
      <td>
        {sprawdzCzyEdytowane(participant.id, "name") ? (
          <span className="loading loading-spinner loading-sm text-primary"></span>
        ) : trybEdycji ? (
          <input
            ref={inputRef}
            autoFocus
            defaultValue={participant.name}
            className="input input-sm w-full max-w-[160px] bg-base-100 shadow-sm rounded-md px-2 py-1 border border-base-300 focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50 transition-all"
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                dodajPoleDoMapy(participant.id, "name");
                await handleUpdate(
                  "name",
                  (e.target as HTMLInputElement).value
                );
                setTrybEdycji(false);
                usunPoleZMapy(participant.id, "name");
              }

              if (e.key === "Escape") {
                setTrybEdycji(false);
                usunPoleZMapy(participant.id, "name");
              }
            }}
            onBlur={() => {
              setTrybEdycji(false);
              usunPoleZMapy(participant.id, "name");
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
          {sprawdzCzyEdytowane(participant.id, "status") ? (
            <span className="loading loading-spinner loading-sm text-primary"></span>
          ) : (
            <select
              className="select select-bordered select-sm w-[110px]"
              value={participant.userTypeId ?? ""}
              onChange={async (e) => {
                dodajPoleDoMapy(participant.id, "status");
                await handleUpdate("userTypeId", parseInt(e.target.value, 10));
                usunPoleZMapy(participant.id, "status");
              }}
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
            <span className="loading loading-spinner loading-sm text-primary"></span>
          ) : (
            <input
              type="checkbox"
              className="toggle toggle-success"
              checked={participant.active}
              onChange={async (e) => {
                dodajPoleDoMapy(participant.id, "active");
                await handleUpdate("active", e.target.checked);
                usunPoleZMapy(participant.id, "active");
              }}
            />
          )}
        </div>
      </td>

      <td>
        <button
          className="btn btn-sm btn-outline btn-error rounded-lg"
          onClick={() => setIdDoUsuniecia(participant.id)}
        >
          {usunWTrakcie === participant.id ? (
            <span className="loading loading-spinner loading-sm text-error"></span>
          ) : (
            <Trash className="w-4 h-4" size={16} />
          )}
        </button>
        {idDoUsuniecia === participant.id && (
          <DialogUsuniecia
            participant={participant}
            setUsunWTrakcieAction={setUsunWTrakcie}
          />
        )}
      </td>
    </tr>
  );
}
