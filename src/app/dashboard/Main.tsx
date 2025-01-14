import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ThemeToggle from '~/components/ui/ThemeTogle';
import { TextField } from '~/form/fields/TextField';
import { FormState } from '~/form/fields/types';
import { useDialog } from '~/provider/DialogProvider';

import '../../app/dialogs/DialogTest';
import '../../app/dialogs/DialogTest2';

export const Main = () => {
  const { openDialog } = useDialog();
  const methods = useForm<FormState>({ mode: 'onSubmit' });

  const handleFormSubmit = (data: FormState) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <ThemeToggle />
      <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
        <TextField name="cedula" isRequired placeholder="Insert yourt text here" />
        <button type="submit" className="text-[var(--font)]">
          Test dispatch
        </button>
      </form>
      <button onClick={() => openDialog('modalTest', '12345')}>Open Modal Test</button>
    </FormProvider>
  );
};
