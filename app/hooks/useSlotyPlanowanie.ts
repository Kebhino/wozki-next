import { pobierzSlotyPlanowania } from "@/lib/api/pobierzSlotyPlanowania";
import { useQuery } from "@tanstack/react-query";

export function useSlotyPlanowanie() {
  return useQuery({
    queryKey: ["sloty-planowanie"],
    queryFn: pobierzSlotyPlanowania
  });
}
