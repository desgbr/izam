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
      <div className='relative'>
        <button
          className='flex flex-col items-center justify-center gap-4'
          onClick={() =>
            width < 500 ? setShowSidebar(true) : setIsOpen(!isOpen)
          }
        >
          <Image
            width={40}
            height={40}
            src='/imgs/avatar.png'
            alt='Profile'
            className='object-cover rounded-full cursor-pointer'
          />
          <div
            className='absolute p-1 overflow-hidden bg-white rounded-full -bottom-1 -right-1 size-5 md:hidden'
          >
            <BarsIcon width={12} />
          </div>
          <div className='items-center justify-center hidden gap-2 md:flex'>
            <span>Profile</span>
            <ArrowDown />
          </div>
        </button>
        {isOpen && (
          <div className='absolute right-0 z-[100] mt-2 w-[316px] overflow-hidden rounded-md bg-white text-black shadow-lg'>
            <UserInfo />
            <hr />
            <button className='block w-full px-4 py-3 text-lg text-left hover:bg-gray-100'>
              Setting and privacy
            </button>
            <button className='block w-full px-4 py-3 text-lg text-left hover:bg-gray-100'>
              Language
            </button>
            <button className='block w-full px-4 py-3 text-lg text-left hover:bg-gray-100'>
              Help
            </button>
            <hr />
            <button className='block w-full px-4 py-3 text-lg text-left text-red-500 hover:bg-gray-100'>
              Logout
            </button>
          </div>
        )}
      </div>
      <MobileNavbar show={showSidebar} setShow={setShowSidebar} />
    </>
  );
}

export default Profile