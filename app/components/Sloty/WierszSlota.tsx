"use client";

import { useState } from "react";
import { Slot, Location } from "@/app/generated/prisma";
import { Loader2, Trash2 } from "lucide-react";
import { updateSlotInDb, deleteSlotFromDb } from "@/lib/api/slots";
import { useQueryClient } from "@tanstack/react-query";
import { useEdytowanePolaMapa } from "@/app/stores/useEdytowanePolaMapa";

interface Props {
  slot: Slot;
  lokalizacje: Location[];
}

export default function WierszSlotu({ slot, lokalizacje }: Props) {
  const queryClient = useQueryClient();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { dodajPoleDoMapy, usunPoleZMapy, sprawdzCzyEdytowane } =
    useEdytowanePolaMapa();

  const update = async (
    field: keyof Slot,
    value: string | number | boolean | Date
  ) => {
    dodajPoleDoMapy(slot.id, field);
    await updateSlotInDb(slot.id, field, value);
    await queryClient.invalidateQueries({ queryKey: ["slots"] });
    usunPoleZMapy(slot.id, field);
  };

  const handleDelete = async () => {
    dodajPoleDoMapy(slot.id, "id");
    await deleteSlotFromDb(slot.id);
    await queryClient.invalidateQueries({ queryKey: ["slots"] });
    usunPoleZMapy(slot.id, "id");
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  return (
    <tr>
      {/* Lokalizacja */}
      <td>
        {sprawdzCzyEdytowane(slot.id, "locationId") ? (
          <Loader2 className="animate-spin w-4 h-4 mx-auto" />
        ) : (
          <select
            className="select select-sm w-full"
            value={slot.locationId}
            onChange={(e) => update("locationId", parseInt(e.target.value))}
          >
            {lokalizacje.map((lok) => (
              <option key={lok.id} value={lok.id}>
                {lok.name}
              </option>
            ))}
          </select>
        )}
      </td>

      {/* Data */}
      <td>
        {sprawdzCzyEdytowane(slot.id, "data") ? (
          <Loader2 className="animate-spin w-4 h-4 mx-auto" />
        ) : (
          <input
            type="date"
            className="input input-sm w-full"
            value={formatDate(slot.data.toString())}
            onChange={(e) =>
              update("data", new Date(e.target.value).toISOString())
            }
          />
        )}
      </td>

      {/* Godzina */}
      <td className="text-center">
        {sprawdzCzyEdytowane(slot.id, "from") ? (
          <Loader2 className="animate-spin w-4 h-4 mx-auto" />
        ) : (
          <select
            className="select select-sm"
            value={slot.from}
            onChange={(e) => update("from", parseInt(e.target.value))}
          >
            {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((godz) => (
              <option key={godz} value={godz}>
                {godz}:00
              </option>
            ))}
          </select>
        )}
      </td>

      {/* Aktywny */}
      <td className="text-center">
        {sprawdzCzyEdytowane(slot.id, "active") ? (
          <Loader2 className="animate-spin w-4 h-4 mx-auto" />
        ) : (
          <input
            type="checkbox"
            className="toggle toggle-success toggle-sm"
            checked={slot.active}
            onChange={(e) => update("active", e.target.checked)}
          />
        )}
      </td>

      {/* Usuń */}
      <td className="text-center">
        {sprawdzCzyEdytowane(slot.id, "id") ? (
          <Loader2 className="animate-spin w-4 h-4 mx-auto" />
        ) : (
          <>
            <button
              className="btn btn-sm btn-outline btn-error"
              onClick={() => setConfirmDelete(true)}
            >
              <Trash2 className="w-4 h-4" />
            </button>

            {confirmDelete && (
              <dialog className="modal modal-open">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Czy na pewno usunąć?</h3>
                  <p className="py-2">
                    {slot.from}:00, {formatDate(slot.data.toString())}
                  </p>
                  <div className="modal-action">
                    <button
                      className="btn btn-outline"
                      onClick={() => setConfirmDelete(false)}
                    >
                      Anuluj
                    </button>
                    <button className="btn btn-error" onClick={handleDelete}>
                      Tak, usuń
                    </button>
                  </div>
                </div>
              </dialog>
            )}
          </>
        )}
      </td>
    </tr>
  );
}
