import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, CheckboxField, FormState, NumberField, RadioGroupField, SelectField, TextAreaField, TextField } from '~/form/fields';

export const FormUse = () => {
  const methods = useForm<FormState>({ mode: 'onChange' });

  const handleFormSubmit = (data: FormState) => {
    console.log(data);
  };

  // Opciones para el RadioGroupField
  const genderOptions = [
    { label: 'Masculino', value: 'masculino' },
    { label: 'Femenino', value: 'femenino' },
  ];

  const countryOptions = [
    { label: 'Ecuador', value: 'ecuador' },
    { label: 'Colombia', value: 'colombia' },
    { label: 'Perú', value: 'peru' },
  ];

  return (
    <div className="bg-[var(--bg)]">
      {/* TODO: en el provider deberia ir el handleSubmit */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)} className="space-y-4">
          <TextField name="Nombre" isRequired placeholder="Insert your text here" label="Nombre:" maxLength={10} />
          <NumberField label="Año:" name="anio" isRequired placeholder="Inserta un año" />
          <CheckboxField label="Acepto los términos y condiciones" name="terms" />
          <RadioGroupField name="gender" options={genderOptions} required={true} />
          <SelectField label="Selecciona tu país" name="country" options={countryOptions} />
          <TextAreaField name="descripcion" label="Descripción:" placeholder="Escribe una descripción..." isRequired={true} />
          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
