"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "../icons/ChevronDown";
import { ProductOption } from "@/types/product";

type CustomSelectProps = {
  defaultText: string;
  option: ProductOption | null;
  selectedValue: string | null;
  handleOptionChange: (valueId: string, value: string) => void;
};

export default function CustomSelect({
  defaultText,
  option,
  selectedValue,
  handleOptionChange,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectValue = (valueId: string, value: string) => {
    handleOptionChange(valueId, value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <p className="flex gap-6">
        <span>{option?.title}</span>
        <span className="text-[#808080]">{selectedValue}</span>
      </p>
      <div ref={selectRef} className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-between cursor-pointer border border-[#D1D1D1] px-4 py-2 rounded"
        >
          <p>{selectedValue ? selectedValue : defaultText}</p>
          <ChevronDown className="w-6 h-6 cursor-pointer text-[#808080" />
        </div>

        {isOpen && (
          <ul className="absolute top-full left-0 w-full border border-[#D1D1D1] rounded mt-1 z-10 bg-background">
            {option?.values.map((ov) => (
              <li
                key={ov.id}
                onClick={() => selectValue(ov.id, ov.value)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {ov.value}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
