"use client";

import { Location } from "@/app/generated/prisma";
import { useLokalizacje } from "@/app/hooks/useLocations";
import { useSloty } from "@/app/hooks/useSlots";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";

const dostepneGodzinyOd = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
const dostepneGodzinyDo = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

export default function FormularzDodawaniaSlotu() {
  const {
    data: lokalizacje = [],
    isLoading,
    isError,
    refetch: refetchSloty,
  } = useLokalizacje();

  const {
    data: sloty = [],
    isLoading: isLoadingSlot,
    isError: isErrorSlot,
  } = useSloty();

  const [dodawanie, setDodawanie] = useState(false);
  const [nowySlot, setNowySlot] = useState({
    lokalizacjaId: "",
    data: new Date().toISOString().split("T")[0], // yyyy-mm-dd
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
    } catch (err) {
      toast.error("Błąd dodawania slota.");
    } finally {
      setDodawanie(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 items-center mb-4">
      {/* Lokalizacja */}
      <select
        className="select select-sm select-bordered"
        value={nowySlot.lokalizacjaId}
        onChange={(e) =>
          setNowySlot((prev) => ({ ...prev, lokalizacjaId: e.target.value }))
        }
      >
        <option value="">Wybierz lokalizację</option>
        {lokalizacje
          .filter((l) => l.active)
          .map((lokalizacja) => (
            <option key={lokalizacja.id} value={lokalizacja.id}>
              {lokalizacja.name}
            </option>
          ))}
      </select>

      {/* Data */}
      <input
        type="date"
        className="input input-sm input-bordered"
        value={nowySlot.data}
        onChange={(e) =>
          setNowySlot((prev) => ({ ...prev, data: e.target.value }))
        }
      />

      {/* Godzina od */}
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
        {dostepneGodzinyOd.map((godzina) => (
          <option key={godzina} value={godzina}>
            {godzina}
          </option>
        ))}
      </select>

      {/* Godzina do */}
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
          setNowySlot((prev) => ({
            ...prev,
            to,
          }));
        }}
      >
        <option value="">Do godziny</option>
        {dostepneGodzinyDo.map((godzina) => (
          <option key={godzina} value={godzina}>
            {godzina}
          </option>
        ))}
      </select>

      {/* Dodaj button */}
      <button
        onClick={handleAddSlot}
        className="btn btn-sm btn-success"
        disabled={dodawanie}
      >
        {dodawanie ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          <IoMdAdd />
        )}
      </button>
    </div>
  );
}
