import React from 'react';
import ThemeToggle from '~/components/ui/ThemeTogle';

import { DialogUse } from '../examples/dialog/DialogUse';
import { FormUse } from '../examples/form/FormUse';
import { UseDebounceExample } from '../examples/hooks/UseDebounceExample';
import UseQueryMutation from '../examples/hooks/UseQueryMutation';

export const Main = () => {
  return (
    <>
      <ThemeToggle />
      <FormUse />
      <DialogUse />
      <UseDebounceExample />
      <UseQueryMutation />
    </>
  );
};
