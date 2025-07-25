import { prisma } from "@/prisma/client";
import TabelaSlotowPrzydzialu from "./TabelaSlotowPrzydzialu";

interface Props {
  data: Date;
  locationId: number;
}

export default async function KartyPrzydzialu({ data, locationId }: Props) {
  const sloty = await prisma.slot.findMany({
    where: {
      active: true,
      data,
      locationId,
    },
    orderBy: { from: "asc" },
    include: {
      users: {
        select: { id: true, name: true },
      },
      Przydzial: {
        include: {
          user: {
            select: { id: true, name: true },
          },
        },
      },
      Location: {
        select: { name: true },
      },
    },
  });

  if (sloty.length === 0) return null;

  const nazwaLokalizacji = sloty[0].Location.name;

  return (
    <div className="card w-96 bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="text-lg font-bold">
          {nazwaLokalizacji} –{" "}
          {new Date(data).toLocaleDateString("pl-PL", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h2>

        <TabelaSlotowPrzydzialu sloty={sloty} />
      </div>
    </div>
  );
}
