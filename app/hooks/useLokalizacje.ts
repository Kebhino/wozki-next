import { useQuery } from "@tanstack/react-query";
import { Location } from "../generated/prisma";
import { pobierzLokalizacje } from "@/lib/api/lokalizacje";


export function useLokalizacje() {
  return useQuery<Location[]>({
    queryKey: ["lokalizacje"],
    queryFn: ({signal}) => pobierzLokalizacje(signal)
  });
}
