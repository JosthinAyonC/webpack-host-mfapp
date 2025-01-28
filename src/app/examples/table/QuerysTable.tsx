import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import QueryTable from '~/components/ui/QueryTable';
import Screen from '~/components/ui/Screen';
import ThemeToggle from '~/components/ui/ThemeTogle';

interface Usuario {
  id: number;
  codigoExterno: string;
  mailPrincipal: string;
}

export const QuerysTable = () => {
  const columns: ColumnDef<Usuario>[] = [
    {
      header: 'ID',
      accessorKey: 'id.codigo',
    },
    {
      header: 'Código Externo',
      accessorKey: 'codigoExterno',
    },
    {
      header: 'Email',
      accessorKey: 'mailPrincipal',
    },
  ];

  const onSelectAction = (row: Usuario) => {
    // Aqui podemos levantar modales como prefiramos...
    console.log(row);
  };

  return (
    <Screen title="Usuarios">
      <ThemeToggle />
      <QueryTable<Usuario>
        columns={columns}
        fetchUrl="http://192.168.0.115:8702/age/v2.0/ageUsuarios/filtro/1"
        filterKey="filtro"
        onSelectAction={onSelectAction}
      />
    </Screen>
  );
};
