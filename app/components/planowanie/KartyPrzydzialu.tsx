"use client";

import { useEffect, useState } from "react";
import UserPrzyciskPrzydzialu from "./UserPrzyciskPrzydzialu";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

interface Props {
  data: Date;
  locationId: number;
}

interface Slot {
  id: number;
  data: string;
  from: number;
  Location: { name: string };
  users: { id: number; name: string | null }[];
  Przydzial: { userId: number }[];
}

export default function KartyPrzydzialu({ data, locationId }: Props) {
  const [sloty, setSloty] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSloty = async () => {
    try {
      const res = await fetch(
        `/api/planowanie/sloty?data=${data.toISOString()}&locationId=${locationId}`
      );
      const json = await res.json();
      setSloty(json);
    } catch (err) {
      console.error("Błąd ładowania slotów:", err);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await fetchSloty();
      setLoading(false);
    };
    init();
  }, [data, locationId]);

  if (loading) return <p>Ładowanie slotów...</p>;
  if (sloty.length === 0) return null;

  const { name } = sloty[0].Location;
  const sformatowanaData = format(new Date(sloty[0].data), "PPPP", {
    locale: pl,
  });

  return (
    <div className="card w-96 bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="text-lg font-bold">
          {name} – {sformatowanaData}
        </h2>

        <div className="mt-4 flex flex-col gap-2">
          {sloty.map((slot) => (
            <div
              key={slot.id}
              className="flex justify-between items-center border-b pb-1 text-sm"
            >
              <span>{slot.from}:00</span>

              <div className="flex flex-wrap gap-1">
                {slot.users.map((u) => {
                  const przydzielony = slot.Przydzial.some(
                    (p) => p.userId === u.id
                  );
                  return (
                    <UserPrzyciskPrzydzialu
                      key={u.id}
                      userId={u.id}
                      slotId={slot.id}
                      userName={u.name ?? `Użytkownik #${u.id}`}
                      czyPrzydzielony={przydzielony}
                      onReloadAction={fetchSloty}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
