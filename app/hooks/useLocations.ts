import { useQuery } from "@tanstack/react-query";
import { Location } from "../generated/prisma";
import { getLocations } from "@/lib/api/locations";


export function useLokalizacje() {
  return useQuery<Location[]>({
    queryKey: ["locations"],
    queryFn: ({signal}) => getLocations(signal)
  });
}
