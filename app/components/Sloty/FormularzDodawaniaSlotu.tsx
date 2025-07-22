"use client";

import { useLokalizacje } from "@/app/hooks/useLocations";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";

const godzinyOd = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
const godzinyDo = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

export default function FormularzDodawaniaSlotu() {
  const { data: lokalizacje = [], refetch: refetchSloty } = useLokalizacje();
  const [dodawanie, setDodawanie] = useState(false);

  const [nowySlot, setNowySlot] = useState({
    lokalizacjaId: "",
    data: new Date().toISOString().split("T")[0],
    from: 0,
    to: undefined as number | undefined,
  });

  const handleAddSlot = async () => {
    if (!nowySlot.lokalizacjaId || nowySlot.from === 0) {
      toast.error("Wybierz lokalizację i godzinę.");
      return;
    }

    const ile = nowySlot.to ? nowySlot.to - nowySlot.from : 1;

    setDodawanie(true);
    try {
      for (let i = 0; i < ile; i++) {
        await fetch("/api/slots", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            locationId: parseInt(nowySlot.lokalizacjaId),
            data: nowySlot.data,
            from: nowySlot.from + i,
          }),
        });
      }

      toast.success(`Dodano ${ile === 1 ? "slot" : `${ile} slotów`}`);
      setNowySlot({
        lokalizacjaId: "",
        data: new Date().toISOString().split("T")[0],
        from: 0,
        to: undefined,
      });
      refetchSloty();
    } catch {
      toast.error("Błąd dodawania slota.");
    } finally {
      setDodawanie(false);
    }
  };

  return (
    <div className="bg-base-200 p-4 rounded-xl shadow-md mb-4">
      <h2 className="text-lg font-semibold mb-4 text-base-content">
        Dodaj slot
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 items-end">
        {/* Lokalizacja */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Lokalizacja</span>
          </label>
          <select
            className="select select-sm select-bordered"
            value={nowySlot.lokalizacjaId}
            onChange={(e) =>
              setNowySlot((prev) => ({
                ...prev,
                lokalizacjaId: e.target.value,
              }))
            }
          >
            <option value="">Wybierz lokalizację</option>
            {lokalizacje
              .filter((l) => l.active)
              .map((lok) => (
                <option key={lok.id} value={lok.id}>
                  {lok.name}
                </option>
              ))}
          </select>
        </div>

        {/* Data */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Data</span>
          </label>
          <input
            type="date"
            className="input input-sm input-bordered"
            value={nowySlot.data}
            onChange={(e) =>
              setNowySlot((prev) => ({ ...prev, data: e.target.value }))
            }
          />
        </div>

        {/* Od godziny */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Od godziny</span>
          </label>
          <select
            className="select select-sm select-bordered"
            value={nowySlot.from || ""}
            onChange={(e) => {
              const godzina = parseInt(e.target.value);
              setNowySlot((prev) => ({
                ...prev,
                from: godzina,
                to: undefined,
              }));
            }}
          >
            <option value="">Od godziny</option>
            {godzinyOd.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Do godziny */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Do godziny</span>
          </label>
          <select
            className="select select-sm select-bordered"
            value={
              typeof nowySlot.to === "number"
                ? nowySlot.to
                : nowySlot.from
                ? nowySlot.from + 1
                : ""
            }
            onChange={(e) => {
              const to = parseInt(e.target.value);
              if (to <= nowySlot.from) {
                toast.error("Godzina 'do' musi być późniejsza niż 'od'");
                return;
              }
              setNowySlot((prev) => ({ ...prev, to }));
            }}
          >
            <option value="">Do godziny</option>
            {godzinyDo.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Przycisk Dodaj */}
        <div className="form-control">
          <button
            onClick={handleAddSlot}
            className="btn btn-sm btn-success mt-5"
            disabled={dodawanie}
          >
            {dodawanie ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <>
                <IoMdAdd className="mr-1" />
                Dodaj
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
