"use client";

import { useGlobalDialogStore } from "@/app/stores/useGlobalDialogStore";
import { useEdytowanePolaMapa } from "@/app/stores/useEdytowanePolaMapa";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Location } from "@/app/generated/prisma";

interface Props {
  lokalizacja: Location;
  setUsunWTrakcieAction: (id: number | null) => void;
}

export default function DialogUsunieciaLokalizacji({
  lokalizacja,
  setUsunWTrakcieAction,
}: Props) {
  const { resetIdDoUsuniecia } = useGlobalDialogStore();
  const { usunPoleZMapy } = useEdytowanePolaMapa();
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    setUsunWTrakcieAction(lokalizacja.id);

    try {
      const res = await fetch("/api/locations", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: lokalizacja.id }),
      });

      const dane = await res.json();

      if (!res.ok) {
        throw new Error(dane.error || "Błąd usuwania lokalizacji");
      }

      toast.success("Lokalizacja usunięta");
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Nie udało się usunąć lokalizacji"
      );
    } finally {
      resetIdDoUsuniecia();
      usunPoleZMapy(lokalizacja.id, "usun");
      setUsunWTrakcieAction(null);
    }
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center">Potwierdź usunięcie</h3>
        <div className="py-4 text-center">
          <p>
            Czy na pewno chcesz usunąć lokalizację:
            <br />
            <span className="font-semibold block mt-2">{lokalizacja.name}</span>
          </p>
          {lokalizacja.active && (
            <p className="text-red-500 mt-2 font-medium">
              Uwaga: ta lokalizacja jest oznaczona jako aktywna.
            </p>
          )}
        </div>

        <div className="modal-action justify-center">
          <button
            className="btn btn-outline"
            onClick={() => {
              resetIdDoUsuniecia();
              usunPoleZMapy(lokalizacja.id, "usun");
            }}
          >
            Anuluj
          </button>
          <button className="btn btn-error" onClick={handleDelete}>
            Usuń
          </button>
        </div>
      </div>
      <form
        method="dialog"
        className="modal-backdrop"
        onClick={() => {
          resetIdDoUsuniecia();
          usunPoleZMapy(lokalizacja.id, "usun");
        }}
      >
        <button>close</button>
      </form>
    </dialog>
  );
}
