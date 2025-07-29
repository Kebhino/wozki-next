"use client";

import { useGlobalDialogStore } from "@/app/stores/useGlobalDialogStore";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { UserType } from "@/app/generated/prisma";

interface Props {
  typ: UserType;
  setUsunWTrakcieAction: (id: number | null) => void;
}

export default function DialogUsunieciaTypu({
  typ,
  setUsunWTrakcieAction,
}: Props) {
  const { resetIdDoUsuniecia } = useGlobalDialogStore();
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    setUsunWTrakcieAction(typ.id);

    try {
      const res = await fetch(`/api/user-types/${typ.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const json = await res.json();

      if (!res.ok) {
        toast.error(json.error || "Błąd przy usuwaniu");
      } else {
        toast.success("Typ został usunięty");
        queryClient.invalidateQueries({ queryKey: ["types"] });
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Nie udało się usunąć typu"
      );
    } finally {
      resetIdDoUsuniecia();
      setUsunWTrakcieAction(null);
    }
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center">Potwierdź usunięcie</h3>
        <div className="py-4 text-center">
          <p>
            Czy na pewno chcesz usunąć typ:
            <br />
            <span className="font-semibold block mt-2">{typ.type}</span>
          </p>
        </div>

        <div className="modal-action justify-center">
          <button
            className="btn btn-outline"
            onClick={() => {
              resetIdDoUsuniecia();
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
        }}
      >
        <button>close</button>
      </form>
    </dialog>
  );
}
