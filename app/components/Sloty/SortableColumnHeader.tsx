"use client";

import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";
import { type FC } from "react";
import type { SortKey } from "./TablicaSlotow"; // lub z osobnego pliku z typami

interface Props {
  label: string;
  sortKey: SortKey;
  currentSort: SortKey;
  sortAsc: boolean;
  onSortChange: (key: SortKey) => void;
}

const SortableColumnHeader: FC<Props> = ({
  label,
  sortKey,
  currentSort,
  sortAsc,
  onSortChange,
}) => {
  const isActive = currentSort === sortKey;

  const IconComponent = isActive
    ? sortAsc
      ? MdArrowDropUp
      : MdArrowDropDown
    : MdArrowDropUp;

  return (
    <div
      className="flex items-center gap-1 cursor-pointer select-none hover:text-base-content/80"
      onClick={() => onSortChange(sortKey)}
    >
      <span className="font-semibold">{label}</span>
      <IconComponent
        size={24}
        color={isActive ? "#1f2937" : "#9ca3af"} // Tailwindowe kolory jako HEX
      />
    </div>
  );
};

export default SortableColumnHeader;
