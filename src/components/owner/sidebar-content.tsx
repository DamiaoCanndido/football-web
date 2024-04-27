'use client';
import { LuLogOut, LuBookMarked } from 'react-icons/lu';
import Link from 'next/link';
import { ComponentProps, useEffect, useRef, useState } from 'react';
import { SideBarContextGlobal } from '@/contexts/sidebar';

interface IconButtonProps extends ComponentProps<'aside'> {
  visible?: boolean;
}

export const SideBarContent = ({ visible, ...props }: IconButtonProps) => {
  const { showSideBar, setShowSideBar } = SideBarContextGlobal();

  const [sideBarTab, setSideBarTab] = useState('');

  const sideBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showSideBar &&
        sideBarRef.current &&
        !sideBarRef.current.contains(event.target as Node)
      ) {
        setShowSideBar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <aside
        ref={sideBarRef}
        {...props}
        className={
          visible
            ? 'border-r bg-violet-50 border-gray-200 bottom-0 fixed z-10 top-16 text-xs text-violet-950 h-screen overflow-y-auto text-center w-48'
            : 'border-r bg-violet-50 border-gray-200 bottom-0 fixed z-10 top-16 text-xs text-violet-950 h-screen overflow-y-auto text-center w-48 max-lg:hidden'
        }
      >
        <div className="h-full overflow-y-auto">
          <Link
            href="/team"
            replace
            className={
              sideBarTab === 'team'
                ? 'flex cursor-pointer border-b border-grey-200 pr-8 py-2 hover:bg-violet-100 items-center bg-violet-300'
                : 'flex cursor-pointer border-b border-grey-200 pr-8 py-2 hover:bg-violet-100 items-center'
            }
            onClick={() => {
              setShowSideBar(false);
              setSideBarTab('team');
            }}
          >
            <LuBookMarked size={30} />
            <span className="px-1 text-sm">Times</span>
          </Link>
          <Link
            href="/league"
            replace
            className={
              sideBarTab === 'league'
                ? 'flex cursor-pointer border-b border-grey-200 pr-8 py-2 hover:bg-violet-100 items-center bg-violet-300'
                : 'flex cursor-pointer border-b border-grey-200 pr-8 py-2 hover:bg-violet-100 items-center'
            }
            onClick={() => {
              setShowSideBar(false);
              setSideBarTab('league');
            }}
          >
            <LuBookMarked size={30} />
            <span className="px-1 text-sm">Ligas</span>
          </Link>
          <Link
            href="/match"
            replace
            className={
              sideBarTab === 'match'
                ? 'flex cursor-pointer border-b border-grey-200 pr-8 py-2 hover:bg-violet-100 items-center bg-violet-300'
                : 'flex cursor-pointer border-b border-grey-200 pr-8 py-2 hover:bg-violet-100 items-center'
            }
            onClick={() => {
              setShowSideBar(false);
              setSideBarTab('match');
            }}
          >
            <LuBookMarked size={30} />
            <span className="px-1 text-sm">Jogos</span>
          </Link>
          <Link
            href="/"
            replace
            className="flex cursor-pointer border-b border-grey-200 pr-8 py-2 hover:bg-red-200 items-center text-red-600"
            onClick={() => {
              setSideBarTab('');
            }}
          >
            <LuLogOut size={30} />
            <span className="px-1 text-sm">Sair</span>
          </Link>
        </div>
      </aside>
    </>
  );
};
