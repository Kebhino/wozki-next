import { useQuery } from "@tanstack/react-query";
import { UserZTypem } from "../components/TablicaUczestnikow/TabelaUczestnikow";
import { getUsers } from "@/lib/api/users";

 
 
 
 export const useUsers = () => { 
    return useQuery<UserZTypem[]>({
    queryKey: ["users"],
    queryFn: ({signal}) => getUsers(signal),
  })}