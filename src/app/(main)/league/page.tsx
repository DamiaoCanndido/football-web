'use client';
import { AuthContextGlobal } from '@/contexts/auth';
import { useEffect, useState } from 'react';

export default function Page() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  });
  const { token, setToken } = AuthContextGlobal();
  return (
    <div className="w-full mt-[72px] ml-52 max-lg:ml-4 mr-4>">
      {isClient ? token : ''}
    </div>
  );
}
