import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ThemeToggle from '~/components/ui/ThemeTogle';
import { Button } from '~/form/fields/Button';
import { CheckboxField } from '~/form/fields/CheckboxField';
import { NumberField } from '~/form/fields/NumberField';
import RadioGroupField from '~/form/fields/RadioGroupField';
import { SelectField } from '~/form/fields/SelectField';
import { TextAreaField } from '~/form/fields/TextAreaField';
import { TextField } from '~/form/fields/TextField';
import { FormState } from '~/form/fields/types';

const Main: React.FC = () => {
  const methods = useForm<FormState>({ mode: 'onSubmit' });

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
      <FormProvider {...methods}>
        <ThemeToggle />
        <form onSubmit={methods.handleSubmit(handleFormSubmit)} className="space-y-4">
          <TextField
            name="Nombre"
            isRequired
            placeholder="Insert your text here"
            label="Nombre:"
          />
          <NumberField
            label="Año:"
            name="anio"
            isRequired
            placeholder="Inserta un año"
          />
          <CheckboxField label="Acepto los términos y condiciones" name="terms" />
          <RadioGroupField
            name="gender"
            options={genderOptions}
            required={true}
          />
          <SelectField
            label="Selecciona tu país"
            name="country"
            options={countryOptions}
          />
          <TextAreaField
            name="descripcion"
            label="Descripción:"
            placeholder="Escribe una descripción..."
            isRequired={true}
          />
          <Button
            variant='primary'
            type="submit"          
          >
            Enviar
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default Main;
