'use client';
import { api } from '@/lib/axios';
import { Team, columns } from './columns';
import { DataTable } from './data-table';
import { AuthContextGlobal } from '@/contexts/auth';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';

export default function Page() {
  const [data, setData] = useState<Team[]>([]);
  const [p, setP] = useState(1);
  const [name, setName] = useState('');
  const router = useRouter();

  const { token } = AuthContextGlobal();

  useEffect(() => {
    async function getData() {
      try {
        const result = await api.get(`/team?name=${name}&p=${p}`);
        setData(result.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          deleteCookie('token');
          router.replace('/');
        }
      }
    }
    getData();
  }, [p, name]);

  return (
    <div className="w-full mt-[72px] ml-52 max-lg:ml-4 mr-4">
      <DataTable
        columns={columns}
        data={data}
        p={p}
        setP={setP}
        name={name}
        setName={setName}
      />
    </div>
  );
}
