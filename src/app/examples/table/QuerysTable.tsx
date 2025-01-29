import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import QueryTable from '~/components/ui/QueryTable';
import Screen from '~/components/ui/Screen';
import ThemeToggle from '~/components/ui/ThemeTogle';
import useMutation from '~/hooks/useMutation';

interface Usuario {
  id: number;
  codigoExterno: string;
  mailPrincipal: string;
}

export const QuerysTable = () => {
  const { mutate } = useMutation('http://192.168.0.115:8702/age/v2.0/ageUsuarios', 'PUT');
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
    {
      header: 'Estado',
      accessorKey: 'estado',
    },
  ];

  const onSelectAction = (row: Usuario) => {
    // Aqui podemos levantar modales como prefiramos...
    console.log(row);
  };

  const onStatusChange = (row: Usuario, newStatus: string) => {
    mutate({ ...row, estado: newStatus });
  };

  return (
    <Screen title="Usuarios">
      <ThemeToggle />
      <QueryTable<Usuario>
        title="Usuarios"
        columns={columns}
        fetchUrl="http://192.168.0.115:8702/age/v2.0/ageUsuarios/filtro/1"
        filterKey="filtro"
        onSelectAction={onSelectAction}
        onDeleteAction={onSelectAction}
        statusAccessor="estado"
        onStatusChange={onStatusChange}
        onNewAction={() => console.log('New action')}
        onDeleteMassiveAction={(array: Usuario[]) => console.log(array)}
      />
    </Screen>
  );
};
