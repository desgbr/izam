import Link from 'next/link'
import React from 'react'

const NavItem = ({icon: Icon, title, link, className =''}) => {
  return (
    <Link
     className={`flex md:flex-col gap-2 p-3 md:p-0 md:gap-4 items-center md:justify-center ${className}`} href={link || '#'}>
      <Icon  className='h-5 md:h-8' width={36} height={36} /> 
      <span>{title}</span>
      </Link>
  )
}

export default NavItem