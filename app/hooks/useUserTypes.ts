import { useQuery } from "@tanstack/react-query"
import { UserType } from "../generated/prisma"
import { getUserTypes } from "@/lib/api/userTypes"

 
 
 export const useUserTypes = () => { 
    return useQuery<UserType[]>({
    queryKey: ["types"],
    queryFn: ({signal}) => getUserTypes(signal),
  })}