import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

const UserInfo = ({className =''}) => {
  return (
    <div className={"flex relative items-center gap-4 px-4 py-3 " + className}>
      <Image
        width={40}
        height={40}
        src="/imgs/avatar.png"
        alt="Profile"
        className="rounded-full size-12 object-cover cursor-pointer"
      />
      <div className="text-gray-600">
        <p className="font-semibold text-lg">Ahmed Gabr</p>
        <p className="text-sm">UX UI designer</p>
      </div>
      <ChevronRight size={20} className='absolute right-2 text-gray-500' />
    </div>
  );
}

export default UserInfo