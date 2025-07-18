"use client";

import { useState } from "react";

interface Props {
  onAddAction: (nazwa: string) => void;
  dodawanie: boolean;
}

export default function FormularzDodawania({ onAddAction, dodawanie }: Props) {
  const [nowaNazwa, setNowaNazwa] = useState("");

  const handleClick = () => {
    onAddAction(nowaNazwa);
    setNowaNazwa("");
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        className="input input-bordered w-full max-w-xs"
        placeholder="Nowa lokalizacja"
        value={nowaNazwa}
        onChange={(e) => setNowaNazwa(e.target.value)}
      />
      <button
        className="btn btn-success"
        onClick={handleClick}
        disabled={dodawanie}
      >
        {dodawanie ? "Dodawanie..." : "Dodaj"}
      </button>
    </div>
  );
}
