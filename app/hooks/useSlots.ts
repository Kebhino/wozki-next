import { useQuery } from "@tanstack/react-query";
import { Slot } from "../generated/prisma";
import { getSlots } from "@/lib/api/slots";




export const useSloty = () => {
  return useQuery<Slot[]>({
    queryKey: ["slots"],
    queryFn: ({ signal }) => getSlots(signal),
    staleTime: 1000 * 60 * 5,
  });
};