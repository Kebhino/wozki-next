"use client";

import { useRouter } from "next/navigation";
import UserPrzyciskPrzydzialu from "./UserPrzyciskPrzydzialu";

interface Props {
  sloty: {
    id: number;
    from: number;
    users: { id: number; name: string | null }[];
    Przydzial: { userId: number }[];
  }[];
}

export default function TabelaSlotowPrzydzialu({ sloty }: Props) {
  const router = useRouter();

  return (
    <div className="mt-4 flex flex-col gap-2">
      {sloty.map((slot) => (
        <div key={slot.id} className="border-b pb-2 text-sm space-y-1">
          <div className="flex justify-between items-center">
            <span>{slot.from}:00</span>
          </div>

          {slot.users.length > 0 ? (
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
                    onReloadAction={() => router.refresh()}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-xs text-gray-400 italic">Brak zgłoszeń</div>
          )}
        </div>
      ))}
    </div>
  );
}
