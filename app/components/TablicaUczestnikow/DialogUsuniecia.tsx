"use client";

import { Participant } from "../../types/participants";
import { useGlobalDialogStore } from "../../stores/useGlobalDialogStore";
import { useEdytowanePolaMapa } from "../../stores/useEdytowanePolaMapa";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

interface Props {
  participant: Participant;
}

// 🧪 Tymczasowa funkcja zamiast prawdziwego API
const deleteParticipantMock = async (id: string) => {
  await new Promise((res) => setTimeout(res, 500)); // symuluj opóźnienie
  console.log(`(Mock) Deleted participant with id: ${id}`);
};

export default function DialogUsuniecia({ participant }: Props) {
  const { resetIdDoUsuniecia } = useGlobalDialogStore();
  const { usunPoleZMapy } = useEdytowanePolaMapa();
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    try {
      await deleteParticipantMock(participant.id); // zamieniamy na mocka
      toast.success("Uczestnik usunięty (mock)");
      queryClient.invalidateQueries({ queryKey: ["participants"] });
    } catch {
      toast.error("Błąd usuwania uczestnika");
    } finally {
      resetIdDoUsuniecia();
      usunPoleZMapy(participant.id, "usun");
    }
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center">Potwierdź usunięcie</h3>
        <p className="py-4 text-center">
          Czy na pewno chcesz usunąć uczestnika:
          <br />
          <span className="font-semibold block mt-2">{participant.name}</span>
          {participant.active && (
            <p className="text-red-500 mt-2 font-medium">
              Uwaga: ten uczestnik jest oznaczony jako aktywny.
            </p>
          )}
        </p>
        <div className="modal-action justify-center">
          <button
            className="btn btn-outline"
            onClick={() => {
              resetIdDoUsuniecia();
              usunPoleZMapy(participant.id, "usun");
            }}
          >
            Anuluj
          </button>
          <button className="btn btn-error" onClick={handleDelete}>
            Usuń
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button
          onClick={() => {
            resetIdDoUsuniecia();
            usunPoleZMapy(participant.id, "usun");
          }}
        >
          close
        </button>
      </form>
    </dialog>
  );
}
