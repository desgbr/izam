"use client";

import { useState } from "react";

const JobAlert = () => {
  const [isAlertOn, setIsAlertOn] = useState(false);

  return (
    <div className="flex-grow  flex items-center justify-between bg-green-600 text-white h-full max-h-[57px] md:max-h-none md:h-auto p-4 rounded-lg">
      <div className="text-sm md:text-2xl">
        <p className="font-medium ">UI Designer in Egypt</p>
        <p className="text-xs md:text-base font-extralight">70 job positions</p>
      </div>
      <div className="flex items-center gap-2 text-xs md:text-xl font-extralight">
        <span>Set alert</span>
        <button
          onClick={() => setIsAlertOn(!isAlertOn)}
          className={`relative w-9 md:w-16 h-5 md:h-8 flex items-center bg-[#C4C3C380] rounded-full p-1 transition ${
            isAlertOn ? "justify-end" : "justify-start"
          }`}
        >
          <span
            className={`size-4 md:size-7 absolute bg-white rounded-full duration-700 transition-all ${
              isAlertOn ? "end-1" : "start-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default JobAlert;
