import { pobierzStatusUczestnika } from "@/lib/api/status"
import { useQuery } from "@tanstack/react-query"
import { UserType } from "../generated/prisma"

 
 
 export const useStatus = () => { 
    return useQuery<UserType[]>({
    queryKey: ["participants"],
    queryFn: ({signal}) => pobierzStatusUczestnika(signal),
  })}