"use client";

import { useGlobalDialogStore } from "@/app/stores/useGlobalDialogStore";
import { useEdytowanePolaMapa } from "@/app/stores/useEdytowanePolaMapa";
import { useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import type { Location } from "@/app/generated/prisma";
import DialogUsunieciaLokalizacji from "./DialogUsunieciaLokalizacji";

interface Props {
  lokalizacja: Location;
}

export default function WierszLokalizacji({ lokalizacja }: Props) {
  const queryClient = useQueryClient();
  const { setIdDoUsuniecia, idDoUsuniecia } = useGlobalDialogStore();
  const { dodajPoleDoMapy, usunPoleZMapy, sprawdzCzyEdytowane } =
    useEdytowanePolaMapa();

  const [trybEdycji, setTrybEdycji] = useState(false);
  const [usunWTrakcie, setUsunWTrakcie] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpdate = useCallback(
    async (field: keyof Location, value: string | boolean) => {
      try {
        const res = await fetch("/api/locations", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: lokalizacja.id,
            field,
            value,
          }),
        });

        if (!res.ok) throw new Error("Błąd aktualizacji");

        queryClient.invalidateQueries({ queryKey: ["locations"] });
      } catch {
        toast.error("Błąd aktualizacji lokalizacji");
      }
    },
    [lokalizacja.id, queryClient]
  );

  return (
    <>
      <tr className="hover">
        <td>
          {sprawdzCzyEdytowane(lokalizacja.id, "name") ? (
            <span className="loading loading-spinner loading-sm text-primary"></span>
          ) : trybEdycji ? (
            <input
              ref={inputRef}
              autoFocus
              defaultValue={lokalizacja.name}
              className="input input-sm w-full max-w-[160px] bg-base-100 shadow-sm rounded-md px-2 py-1 border border-base-300 focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50 transition-all"
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  dodajPoleDoMapy(lokalizacja.id, "name");
                  await handleUpdate(
                    "name",
                    (e.target as HTMLInputElement).value
                  );
                  setTrybEdycji(false);
                  usunPoleZMapy(lokalizacja.id, "name");
                }

                if (e.key === "Escape") {
                  setTrybEdycji(false);
                  usunPoleZMapy(lokalizacja.id, "name");
                }
              }}
              onBlur={() => {
                setTrybEdycji(false);
                usunPoleZMapy(lokalizacja.id, "name");
              }}
            />
          ) : (
            <span
              className="cursor-pointer truncate max-w-[160px] inline-block"
              onClick={() => setTrybEdycji(true)}
            >
              {lokalizacja.name}
            </span>
          )}
        </td>

        <td>
          {sprawdzCzyEdytowane(lokalizacja.id, "active") ? (
            <span className="loading loading-spinner loading-sm text-primary"></span>
          ) : (
            <input
              type="checkbox"
              className="toggle toggle-success"
              checked={lokalizacja.active}
              onChange={async (e) => {
                dodajPoleDoMapy(lokalizacja.id, "active");
                await handleUpdate("active", e.target.checked);
                usunPoleZMapy(lokalizacja.id, "active");
              }}
            />
          )}
        </td>

        <td>
          <button
            className="btn btn-sm btn-outline btn-error rounded-lg"
            onClick={() => setIdDoUsuniecia(lokalizacja.id)}
          >
            {usunWTrakcie === lokalizacja.id ? (
              <span className="loading loading-spinner loading-sm text-error"></span>
            ) : (
              <Trash className="w-4 h-4" />
            )}
          </button>

          {idDoUsuniecia === lokalizacja.id && (
            <DialogUsunieciaLokalizacji
              lokalizacja={lokalizacja}
              setUsunWTrakcieAction={setUsunWTrakcie}
            />
          )}
        </td>
      </tr>
    </>
  );
}
