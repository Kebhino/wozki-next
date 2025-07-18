"use client";

import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";
import { type FC } from "react";

type SortTypeLokalizacje = "name" | "status";

interface Props {
  label: string;
  sortKey: SortTypeLokalizacje;
  currentSort: SortTypeLokalizacje;
  sortAsc: boolean;
  onSortChange: (key: SortTypeLokalizacje) => void;
}

const SortableColumnHeaderLokalizacje: FC<Props> = ({
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
        color={isActive ? "#1f2937" : "#9ca3af"} // Tailwindowe kolory w hex
      />
    </div>
  );
};

export default SortableColumnHeaderLokalizacje;
