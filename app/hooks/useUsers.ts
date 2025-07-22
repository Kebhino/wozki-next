import { useQuery } from "@tanstack/react-query";
import { UserZTypem } from "../components/TablicaUczestnikow/TabelaUczestnikow";
import { pobierzUczestnikow } from "@/lib/api/users";

 
 
 
 export const useUczestnicy = () => { 
    return useQuery<UserZTypem[]>({
    queryKey: ["participants"],
    queryFn: ({signal}) => pobierzUczestnikow(signal),
  })}