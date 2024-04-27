'use client';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

export type Team = {
  id: string;
  name: string;
  code: string;
  logo: string;
  country: string;
  type: 'amateur' | 'club' | 'selection';
};

export const columns: ColumnDef<Team>[] = [
  {
    accessorKey: 'logo',
    header: 'Escudo',
    cell: ({ row }) => {
      const logo = row.getValue('logo') as string;
      return <Image src={logo} width={40} height={40} alt={''} />;
    },
  },
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'code',
    header: 'Sigla',
  },
  {
    accessorKey: 'country',
    header: 'País',
  },
];
