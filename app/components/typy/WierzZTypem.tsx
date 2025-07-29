"use client";

import { useGlobalDialogStore } from "@/app/stores/useGlobalDialogStore";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { UserType } from "@/app/generated/prisma";
import DialogUsunieciaTypu from "./DialogusunieciaTypu";

interface Props {
  typ: UserType;
}

export default function WierszZTypem({ typ }: Props) {
  const queryClient = useQueryClient();
  const { setIdDoUsuniecia, idDoUsuniecia } = useGlobalDialogStore();
  const [usunWTrakcie, setUsunWTrakcie] = useState<number | null>(null);

  return (
    <>
      <tr className="hover">
        <td>{typ.type}</td>
        <td>{typ.multipler}</td>
        <td>
          <button
            className="btn btn-sm btn-outline btn-error rounded-lg"
            onClick={() => setIdDoUsuniecia(typ.id)}
          >
            {usunWTrakcie === typ.id ? (
              <span className="loading loading-spinner loading-sm text-error"></span>
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </button>

          {idDoUsuniecia === typ.id && (
            <DialogUsunieciaTypu
              typ={typ}
              setUsunWTrakcieAction={setUsunWTrakcie}
            />
          )}
        </td>
      </tr>
    </>
  );
}
