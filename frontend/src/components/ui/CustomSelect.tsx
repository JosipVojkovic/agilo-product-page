"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "../icons/ChevronDown";

type CustomSelectProps = {
  defaultText: string;
  options: string[];
  selectedValue: string | null;
  handleOptionChange: (value: string | null) => void;
};

export default function CustomSelect({
  defaultText,
  options,
  selectedValue,
  handleOptionChange,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectValue = (option: string) => {
    handleOptionChange(option);
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
    <div ref={selectRef} className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between cursor-pointer border border-[#D1D1D1] px-4 py-2 rounded"
      >
        <p>{selectedValue ? selectedValue : defaultText}</p>
        <ChevronDown className="w-6 h-6 cursor-pointer text-[#808080" />
      </div>

      {isOpen && (
        <ul className="absolute top-full left-0 w-full border border-[#D1D1D1] rounded mt-1 z-10">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => selectValue(option)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
