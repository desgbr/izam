"use client";
import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { sort } from "@/data/sort";

const SortingDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(sort[0]);

  return (
    <div className="relative hidden md:inline-block max-w-[308px] self-end text-left p-4 mt-4 z-50 rounded-lg border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-gray-900 font-medium"
      >
        Sorting by : <span className="text-green-600">{selected.title}</span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {isOpen && (
        <div className="absolute mt-2 end-0 w-full  max-w-[308] bg-white ">
          {sort.map((option) => (
            <button
              key={sort.key}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
              className={`block w-full text-left p-4 ${
                selected === option
                  ? "bg-gray-200 text-green-600"
                  : "text-gray-700"
              } hover:bg-gray-100`}
            >
              {option.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SortingDropdown;