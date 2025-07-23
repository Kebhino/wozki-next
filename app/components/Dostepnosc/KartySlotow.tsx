import { prisma } from "@/prisma/client";
import ZapiszRezygnujButton from "./ZapiszZrezygnujButton";

interface Props {
  data: Date;
  locationId: number;
}

export default async function KartaSlotow({ data, locationId }: Props) {
  const sloty = await prisma.slot.findMany({
    where: {
      active: true,
      data,
      locationId,
    },
    orderBy: { from: "asc" },
  });

  const location = await prisma.location.findUnique({
    where: { id: locationId },
  });

  return (
    <div className="card w-96 bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="text-lg font-bold">
          {location?.name} - {new Date(data).toLocaleDateString("pl-PL")}
        </h2>

        <div className="mt-4 flex flex-col gap-2">
          {sloty.map((slot) => (
            <div
              key={slot.id}
              className="flex justify-between items-center border-b pb-1 text-sm"
            >
              <span>{slot.from}:00</span>
              <ZapiszRezygnujButton slotId={slot.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
