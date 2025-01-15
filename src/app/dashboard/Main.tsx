import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ThemeToggle from '~/components/ui/ThemeTogle';
import { TextField } from '~/form/fields/TextField';
import { FormState } from '~/form/fields/types';

import { DialogUse } from '../examples/dialog/DialogUse';

export const Main = () => {
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
      <DialogUse />
    </FormProvider>
  );
};