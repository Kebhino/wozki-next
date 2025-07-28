"use client";

import { useUserTypes } from "@/app/hooks/useUserTypes";
import React from "react";
import WierszZTypem from "./WierzZTypem";
import FormularzDodawaniaTypow from "./FormularzDodawaniaTypow";

const ListaTypow = () => {
  const { data: typy = [], isLoading, isError } = useUserTypes();

  return (
    <>
      <FormularzDodawaniaTypow />
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th>Typ</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {typy.map((typ) => (
              <WierszZTypem key={typ.id} typ={typ} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListaTypow;
