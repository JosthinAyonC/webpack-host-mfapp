import React from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '~/form/Form';
import { Button, FormState, TextField } from '~/form/fields';

export const FormUse = () => {
  const methods = useForm<FormState>({
    mode: 'onChange',
    defaultValues: { name: 'Valor por defecto' },
  });

  const onSubmit = (data: FormState) => {
    console.log(data);
  };

  return (
    <div className="bg-[var(--bg)]">
      <Form<FormState> onSubmit={onSubmit} methods={methods} className="space-y-4">
        <TextField name="name" label="Name" isRequired placeholder="Enter your name" />
        <Button variant="outline" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
