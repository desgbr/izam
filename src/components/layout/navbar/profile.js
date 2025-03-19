'use client'
import ArrowDown from '@/components/icons/arrow-down';
import BarsIcon from '@/components/icons/bars';
import useScreenSize from '@/hooks/useScreenSize';
import Image from 'next/image';
import React, { useState } from 'react'
import MobileNavbar from '../mobile';
import UserInfo from './user-info';

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const {width} = useScreenSize()
  console.log(width);
  return (
    <>
    <div className="relative">
      <button
        className="flex flex-col gap-4 justify-center items-center"
        onClick={() =>
          width < 500 ? setShowSidebar(true): setIsOpen(!isOpen)
        }
      >
        <Image
          width={40}
          height={40}
          src="/imgs/avatar.png"
          alt="Profile"
          className="rounded-full object-cover cursor-pointer"
        />
        <div className="absolute size-5 md:hidden bg-white rounded-full  p-1 overflow-hidden -bottom-1 -right-1">
          <BarsIcon width={12} />
        </div>
        <div className="hidden md:flex justify-center items-center gap-2">
          <span>Profile</span>
          <ArrowDown />
        </div>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-[316px] z-[100] bg-white text-black shadow-lg rounded-md overflow-hidden">
          <UserInfo/>
          <hr />
          <button className="block px-4 text-lg py-3 w-full text-left hover:bg-gray-100">
            Setting and privacy
          </button>
          <button className="block px-4 text-lg py-3 w-full text-left hover:bg-gray-100">
            Language
          </button>
          <button className="block px-4 text-lg py-3 w-full text-left hover:bg-gray-100">
            Help
          </button>
          <hr />
          <button className="block px-4 text-lg py-3 w-full text-left text-red-500 hover:bg-gray-100">
            Logout
          </button>
        </div>
      )}
    </div>
    <MobileNavbar show={showSidebar} setShow={setShowSidebar}/>
    </>
  );
}

export default Profile