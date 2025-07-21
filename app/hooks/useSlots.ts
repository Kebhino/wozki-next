import { useQuery } from "@tanstack/react-query";
import { Slot } from "../generated/prisma";
import { pobierzSloty } from "@/lib/api/sloty";




export const useSloty = () => {
  return useQuery<Slot[]>({
    queryKey: ["sloty"],
    queryFn: ({ signal }) => pobierzSloty(signal),
    staleTime: 1000 * 60 * 5,
  });
};