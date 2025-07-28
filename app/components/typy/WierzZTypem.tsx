import { UserType } from "@/app/generated/prisma";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

interface Props {
  typ: UserType;
}

const WierszZTypem = ({ typ }: Props) => {
  const queryClient = useQueryClient();

  const deleteAction = async () => {
    const potwierdzenie = confirm(`Na pewno chcesz usunąć typ "${typ.type}"?`);
    if (!potwierdzenie) return;
    try {
      const res = await fetch(`api/user-types/${typ.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Błąd usuwania");
      toast.success("Typ został usunięty");
      queryClient.invalidateQueries({ queryKey: ["types"] });
    } catch {
      toast.error("Nie udało się usunąc typu");
    }
  };

  return (
    <tr>
      <td>{typ.type}</td>
      <td>
        <button className="btn btn-error btn-outline" onClick={deleteAction}>
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  );
};
export default WierszZTypem;
