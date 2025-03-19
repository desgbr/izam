import React from 'react'
import NavItem from './nav-item';

const NavList = ({data, className = ''}) => {
  return (
    <div className={`flex md:gap-10 ${className}`}>
      {data.map((item) => (
        <NavItem key={item.title} {...item} />
      ))}
    </div>
  );
}

export default NavList