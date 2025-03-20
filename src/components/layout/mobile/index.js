import React from 'react'
import UserInfo from '../navbar/user-info'
import NavList from '../navbar/nav-list'
import { links } from '@/data/navbar'

const MobileNavbar = ({show, setShow}) => {
  const handleClose = () => setShow(false)
  return (
    show && (
      <nav
        onClick={() => setShow(false)}
        className='fixed left-0 top-0 z-[999] flex h-screen w-screen justify-end overflow-hidden bg-black/80 md:hidden'
      >
        <div
          className={`${show ? 'translate-x-0' : 'translate-x-full'} h-screen w-10/12  bg-white transition-transform duration-1000 `}
        >
          <UserInfo className='py-8 border-b' />
          <NavList
            className='flex-col justify-start gap-1 py-4 text-gray-900'
            data={links}
          />
          <button
            onClick={handleClose}
            className='block w-full px-4 py-3 text-base text-left text-gray-800 hover:bg-gray-100'
          >
            Setting and privacy
          </button>
          <button
            onClick={handleClose}
            className='block w-full px-4 py-3 text-base text-left text-gray-800 hover:bg-gray-100'
          >
            Language
          </button>
          <button
            onClick={handleClose}
            className='block w-full px-4 py-3 text-base text-left text-gray-800 hover:bg-gray-100'
          >
            Help
          </button>
          <hr />
          <button
            onClick={handleClose}
            className='block w-full px-4 py-3 text-base text-left text-red-500 hover:bg-gray-100'
          >
            Logout
          </button>
        </div>
      </nav>
    )
  );
}

export default MobileNavbar