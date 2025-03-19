import React from 'react'
import UserInfo from '../navbar/user-info'
import NavList from '../navbar/nav-list'
import { links } from '@/data/navbar'

const MobileNavbar = ({show, setShow}) => {
  return show && (
    <nav onClick={() => setShow(false)} className='md:hidden fixed w-screen flex justify-end top-0 left-0 h-screen overflow-hidden bg-black/80 z-[999]'>
      <div className="w-10/12 h-screen bg-white ">
      <UserInfo className='border-b py-8'/>
      <NavList className='text-gray-900 flex-col justify-start gap-1 py-4' data={links}/>
        <button className="block text-gray-800 px-4 text-base py-3 w-full text-left hover:bg-gray-100">
            Setting and privacy
          </button>
          <button className="block text-gray-800 px-4 text-base py-3 w-full text-left hover:bg-gray-100">
            Language
          </button>
          <button className="block text-gray-800 px-4 text-base py-3 w-full text-left hover:bg-gray-100">
            Help
          </button>
          <hr />
          <button className="block px-4 text-base py-3 w-full text-left text-red-500 hover:bg-gray-100">
            Logout
          </button>
        </div>
    </nav>
  )
}

export default MobileNavbar