import SearchIcon from '@/components/icons/search';
import { links } from '@/data/navbar';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import NavList from './nav-list';
import Profile from './profile';

const Navbar = () => {
  return (
    <nav className="bg-[#161616] text-white px-6 py-5 flex flex-row-reverse md:flex-row items-center justify-between">
      <div className="flex items-center gap-10">
        <Link href='/' className="text-xl font-bold">
          <Image 
            src='/imgs/izam.png'
            width={81}
            height={27}
            alt='izam'
            className='w-14 md:w-20 object-contain'
          />
        </Link>
        <div className="hidden md:block relative">
          <div 
            className="absolute flex items-center justify-center size-10 left-2 top-1/2 transform -translate-y-1/2 bg-green-500 text-white rounded-full p-1"
          >
          <SearchIcon
            className='size-5'
            width={22}
            height={22}
          />

          </div>
          <input
            type="text"
            placeholder="Search by name, job title, ..."
            className="pl-16 pr-4 py-4 rounded-full bg-white text-black w-72 2xl:w-[451px]"
          />
        </div>
      </div>
      <div className="flex gap-14">
      <NavList data={links} className='hidden md:flex gap-14' />
      <Profile/>
      </div>
    </nav>
  );
}

export default Navbar