import React, { useMemo } from 'react';
import { Table, ThemeToggle } from '~/components/ui';
import Screen from '~/components/ui/Screen';

type Item = {
  name: string;
  price: number;
  quantity: number;
};

export const BasicTable = () => {
  const data: Item[] = useMemo(
    () => [
      { name: 'Item 1', price: 100, quantity: 2 },
      { name: 'Item 2', price: 200, quantity: 3 },
      { name: 'Item 1', price: 100, quantity: 2 },
      { name: 'Item 2', price: 200, quantity: 3 },
      { name: 'Item 1', price: 100, quantity: 2 },
      { name: 'Item 2', price: 200, quantity: 3 },
      { name: 'Item 1', price: 100, quantity: 2 },
      { name: 'Item 2', price: 200, quantity: 3 },
      { name: 'Item 1', price: 100, quantity: 2 },
      { name: 'Item 2', price: 200, quantity: 3 },
      { name: 'Item 1', price: 100, quantity: 2 },
      { name: 'Item 2', price: 200, quantity: 3 },
      { name: 'Item 1', price: 100, quantity: 2 },
      { name: 'Item 2', price: 200, quantity: 3 },
      { name: 'Item 1', price: 100, quantity: 2 },
      { name: 'Item 2', price: 200, quantity: 3 },
      { name: 'Item 1', price: 100, quantity: 2 },
      { name: 'Item 2', price: 200, quantity: 3 },
      { name: 'Item 1', price: 100, quantity: 2 },
      { name: 'Item 2', price: 200, quantity: 3 },
      { name: 'Item 1', price: 100, quantity: 2 },
      { name: 'Item 2', price: 200, quantity: 3 },
      { name: 'Item 1', price: 100, quantity: 2 },
      { name: 'Dand', price: 200, quantity: 3 },
      // más datos...
    ],
    []
  );

  const header = useMemo(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
      },
      {
        header: 'Price',
        accessorKey: 'price',
      },
      {
        header: 'Quantity',
        accessorKey: 'quantity',
      },
    ],
    []
  );
  return (
    <Screen title="Dashboard">
      <ThemeToggle />
      <Table data={data} columns={header} />
    </Screen>
  );
};
