'use client';
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from 'react';

export interface childrenType {
  children: ReactNode;
}

interface ContextProps {
  showSideBar: boolean;
  setShowSideBar: Dispatch<SetStateAction<boolean>>;
  sideBarItem: string;
  setSideBarItem: Dispatch<SetStateAction<string>>;
}

const SideBarContext = createContext<ContextProps>({
  showSideBar: false,
  setShowSideBar: (): boolean => false,
  sideBarItem: '',
  setSideBarItem: (): string => '',
});

export const SideBarContextProvider = (props: childrenType) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [sideBarItem, setSideBarItem] = useState('decrees');

  return (
    <SideBarContext.Provider
      value={{ showSideBar, setShowSideBar, sideBarItem, setSideBarItem }}
    >
      {props.children}
    </SideBarContext.Provider>
  );
};

export const SideBarContextGlobal = () => {
  return useContext(SideBarContext);
};
