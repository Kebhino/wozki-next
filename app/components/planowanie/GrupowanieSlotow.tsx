"use client";

import { useState, useEffect } from "react";
import KartyPrzydzialu from "./KartyPrzydzialu";
import { format } from "date-fns";

interface Grupa {
  data: string;
  locationId: number;
}

// 📅 Funkcja pomocnicza do obliczania domyślnego zakresu
const domyslnyZakresDat = () => {
  const teraz = new Date();
  const pierwszyDzien = new Date(teraz.getFullYear(), teraz.getMonth() + 1, 1);
  const ostatniDzien = new Date(teraz.getFullYear(), teraz.getMonth() + 2, 0);
  return {
    dataOd: format(pierwszyDzien, "yyyy-MM-dd"),
    dataDo: format(ostatniDzien, "yyyy-MM-dd"),
  };
};

export default function GrupowanieSlotow() {
  const { dataOd: start, dataDo: end } = domyslnyZakresDat();
  const [dataOd, setDataOd] = useState(start);
  const [dataDo, setDataDo] = useState(end);
  const [grupy, setGrupy] = useState<Grupa[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGrupy = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/planowanie/grupy?dataOd=${dataOd}&dataDo=${dataDo}`
        );
        if (!res.ok) {
          console.error("Błąd odpowiedzi z serwera:", await res.text());
          return;
        }
        const json = await res.json();
        setGrupy(json);
      } catch (err) {
        console.error("Błąd ładowania grup:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGrupy();
  }, [dataOd, dataDo]);

  return (
    <div className="space-y-6">
      {/* 📅 Filtry */}
      <div className="flex gap-4">
        <div>
          <label className="label">Od</label>
          <input
            type="date"
            className="input input-bordered"
            value={dataOd}
            onChange={(e) => setDataOd(e.target.value)}
          />
        </div>
        <div>
          <label className="label">Do</label>
          <input
            type="date"
            className="input input-bordered"
            value={dataDo}
            onChange={(e) => setDataDo(e.target.value)}
          />
        </div>
      </div>

      {/* 🧱 Lista grup */}
      {loading ? (
        <p className="text-sm text-gray-400 italic">Ładowanie...</p>
      ) : grupy.length === 0 ? (
        <p className="text-sm text-gray-400 italic">Brak wyników</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {grupy.map((grupa) => (
            <KartyPrzydzialu
              key={`${grupa.data}-${grupa.locationId}`}
              data={new Date(grupa.data)}
              locationId={grupa.locationId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
