import React from 'react';
import ThemeToggle from '~/components/ui/ThemeTogle';

import { DialogUse } from '../examples/dialog/DialogUse';
import { FormUse } from '../examples/form/FormUse';

export const Main = () => {
  return (
    <>
      <ThemeToggle />
      <FormUse />
      <DialogUse />
    </>
  );
};
