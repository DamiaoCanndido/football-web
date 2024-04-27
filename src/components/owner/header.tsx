'use client';
import { SideBarContextGlobal } from '@/contexts/sidebar';
import { useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

export const Header = () => {
  const { showSideBar, setShowSideBar } = SideBarContextGlobal();

  useEffect(() => {
    setShowSideBar(false);
  }, []);

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };
  return (
    <nav className="bg-violet-950 fixed flex mx-auto px-2 top-0 w-full h-16 items-center justify-between">
      <div
        className="lg:hidden px-1 text-white cursor-pointer"
        onClick={toggleSideBar}
      >
        {showSideBar ? (
          <AiOutlineClose size={30} />
        ) : (
          <AiOutlineMenu size={30} />
        )}
      </div>
      <h1 className="font-bold text-white">FOOTBALL WEB</h1>
    </nav>
  );
};
