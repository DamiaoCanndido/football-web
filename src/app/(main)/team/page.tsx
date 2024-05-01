'use client';
import { api } from '@/lib/axios';
import { Team, columns } from './columns';
import { DataTable } from './data-table';
import { AuthContextGlobal } from '@/contexts/auth';
import { useToast } from '@/components/ui/use-toast';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import { CreateTeam } from '@/entities/team';
import { ToastAction } from '@/components/ui/toast';

export default function Page() {
  const [data, setData] = useState<Team[]>([]);
  const [p, setP] = useState(1);
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [load, setLoad] = useState(true);
  const [type, setType] = useState<'all' | 'amateur' | 'club' | 'selection'>(
    'all'
  );
  const router = useRouter();
  const { toast } = useToast();

  const { token } = AuthContextGlobal();

  useEffect(() => {
    async function getData() {
      try {
        const countryQuery = country !== '' ? `&country=${country}` : '';
        const typeQuery = type === 'all' ? '' : `&type=${type}`;
        const result = await api.get(
          `/team?name=${name}${countryQuery}${typeQuery}&p=${p}`
        );
        setData(result.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          deleteCookie('token');
          router.replace('/');
        }
      }
    }
    getData();
  }, [p, load]);

  const create = async ({ name, code, logo, type, country }: CreateTeam) => {
    try {
      await api.post(
        '/team',
        {
          name,
          code: code.toUpperCase(),
          logo,
          type,
          country,
        },
        { headers: { founder: token } }
      );
      setLoad(!load);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: error.response?.data.message,
          variant: 'destructive',
          action: <ToastAction altText="fechar">fechar</ToastAction>,
        });
      }
    }
  };

  return (
    <div className="w-full mt-[72px] ml-52 max-lg:ml-4 mr-4">
      <DataTable
        columns={columns}
        data={data}
        p={p}
        setP={setP}
        name={name}
        setName={setName}
        load={load}
        setLoad={setLoad}
        country={country}
        setCountry={setCountry}
        type={type}
        setType={setType}
        create={create}
      />
    </div>
  );
}
