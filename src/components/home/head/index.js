'use client'
import React from "react";
import SortingDropdown from "./sorting";
import JobAlert from "./alert";
import { MenuIcon } from "lucide-react";
import { useOpenSidenav } from "@/context/app";
import Sidebar from "@/components/layout/sidebar";

const Head = () => {
      const {open, setOpen } = useOpenSidenav();

  return (
    <>
      {open && (
        <div className={`fixed top-0 left-0 overflow-y-hidden z-[999] h-screen w-screen bg-white md:hidden`}>
          
          <Sidebar />
        </div>
      )}
      <div className='flex flex-col justify-end gap-4 mb-4'>
        <SortingDropdown />
        <div className='flex items-center justify-between gap-4 mt-4 md:mt-0'>
          <JobAlert />
          <div
            onClick={() => setOpen(true)}
            className='flex size-[57px] items-center justify-center rounded-md border bg-white md:hidden'
          >
            <MenuIcon size={20} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Head;
