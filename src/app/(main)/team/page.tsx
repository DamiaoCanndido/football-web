'use client';
import { AuthContextGlobal } from '@/contexts/auth';
import { useEffect, useState } from 'react';

export default function Page() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  });
  const { token, setToken } = AuthContextGlobal();
  return <h1>{isClient ? token : ''}</h1>;
}
