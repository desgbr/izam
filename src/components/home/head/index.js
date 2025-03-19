import React from "react";
import SortingDropdown from "./sorting";
import JobAlert from "./alert";
import { MenuIcon } from "lucide-react";

const Head = () => {
  return (
    <div className="flex justify-end flex-col gap-4  mb-4">
      <SortingDropdown />
      <div className="flex gap-4 mt-4 md:mt-0 justify-between items-center">
        <JobAlert />
        <div className="size-[57px] md:hidden flex justify-center items-center border bg-white rounded-md">
          <MenuIcon size={20} />
        </div>
      </div>
    </div>
  );
};

export default Head;
