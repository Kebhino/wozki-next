import { useQuery } from "@tanstack/react-query";
import { UserZTypem } from "../components/TablicaUczestnikow/TabelaUczestnikow";
import { getUsers } from "@/lib/api/users";

 
 
 
 export const useUczestnicy = () => { 
    return useQuery<UserZTypem[]>({
    queryKey: ["users"],
    queryFn: ({signal}) => getUsers(signal),
  })}