import React from 'react';
import Screen from '~/components/ui/Screen';
import ThemeToggle from '~/components/ui/ThemeTogle';
import { useToast } from '~/hooks/useToast';

import { DialogUse } from '../examples/dialog/DialogUse';
import { FormUse } from '../examples/form/FormUse';
import { UseDebounceExample } from '../examples/hooks/UseDebounceExample';
import UseQueryMutation from '../examples/hooks/UseQueryMutation';

export const Main = () => {
  const { addToast } = useToast();
  return (
    <Screen title="Dashboard">
      <button className="btn" onClick={() => addToast('Operation completed successfully!', 'success')}>
        Click me
      </button>
      <ThemeToggle />
      <FormUse />
      <DialogUse />
      <UseDebounceExample />
      <UseQueryMutation />
    </Screen>
  );
};
