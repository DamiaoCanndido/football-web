'use client';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDownIcon } from '@radix-ui/react-icons';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  p: number;
  setP: Dispatch<SetStateAction<number>>;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
}

const teamTypes = [
  { name: 'all', label: 'Todos' },
  { name: 'amateur', label: 'Amadores' },
  { name: 'club', label: 'Clubes' },
  { name: 'selection', label: 'Seleções' },
];

export function DataTable<TData, TValue>({
  columns,
  data,
  p,
  setP,
  name,
  setName,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [typeTitle, setTypeTitle] = useState('Todos');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    pageCount: data.length === 0 ? p : p + 1,
    state: {
      columnFilters,
    },
  });

  return (
    <div className="rounded-md border">
      <div className="flex items-center py-4 max-lg:flex-col mr-4">
        <Input
          placeholder="Nome..."
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setP(1);
          }}
          className="max-w-xs ml-2 max-lg:mb-2"
        />
        <Input
          placeholder="País..."
          value={(table.getColumn('country')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('country')?.setFilterValue(event.target.value)
          }
          className="max-w-xs ml-2"
        />
        <div className="ml-2 max-lg:mt-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                {typeTitle} <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {teamTypes.map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.label}
                    className="capitalize"
                    onCheckedChange={(value) => {
                      setTypeTitle(column.label);
                      column.name === 'all'
                        ? table.getColumn('type')?.setFilterValue('')
                        : table.getColumn('type')?.setFilterValue(column.name);
                    }}
                  >
                    {column.label}
                  </DropdownMenuCheckboxItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Vazio
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4 pr-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.previousPage();
            setP(p - 1);
            setName('');
          }}
          disabled={p === 1}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.nextPage();
            setP(p + 1);
            setName('');
          }}
          disabled={data.length < 10}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
}
