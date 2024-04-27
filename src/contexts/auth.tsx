'use client';
import { getCookie } from 'cookies-next';
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
  token?: string;
  setToken: Dispatch<SetStateAction<string | undefined>>;
}

const AuthContext = createContext<ContextProps>({
  token: '',
  setToken: (): string => '',
});

export const AuthContextProvider = (props: childrenType) => {
  const [token, setToken] = useState(getCookie('token'));

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const AuthContextGlobal = () => {
  return useContext(AuthContext);
};
