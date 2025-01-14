import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ThemeToggle from '~/components/ui/ThemeTogle';
import { CheckboxField } from '~/form/fields/CheckboxField';
import { NumberField } from '~/form/fields/NumberField';
import RadioGroupField from '~/form/fields/RadioGroupField';
import { SelectField } from '~/form/fields/SelectField';
import { TextAreaField } from '~/form/fields/TextAreaField';
import { TextField } from '~/form/fields/TextField';
// Importamos el TextAreaField
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
            inputClassName="border-[var(--border)] focus:ring-[var(--focus)]"
            labelClassName="text-[var(--font)]"
          />
          <NumberField
            label="Año:"
            name="anio"
            isRequired
            placeholder="Inserta un año"
            inputClassName="border-[var(--border)] focus:ring-[var(--focus)]"
            labelClassName="text-[var(--font)]"
          />
          <CheckboxField label="Acepto los términos y condiciones" checkClassName="accent-primary" name="terms" />
          <RadioGroupField
            name="gender"
            options={genderOptions}
            required={true}
            groupClassName="gap-4"
            optionClassName="border-[var(--border)] focus:ring-[var(--focus)]"
            optionLabelClassName="text-[var(--font)]"
            errorClassName="text-[var(--error)]"
          />
          <SelectField
            label="Selecciona tu país"
            name="country"
            options={countryOptions}
            labelClassName="text-[var(--font)]"
            selectClassName="border-[var(--border)] focus:ring-[var(--focus)]"
            errorClassName="text-[var(--error)]"
          />
          <TextAreaField
            name="descripcion"
            label="Descripción:"
            placeholder="Escribe una descripción..."
            isRequired={true}
            inputClassName="border-[var(--border)] focus:ring-[var(--focus)]"
            labelClassName="text-[var(--font)]"
            errorClassName="text-[var(--error)]"
          />
          <button
            type="submit"
            className="bg-[var(--primary)] text-white py-2 px-4 rounded hover:bg-[var(--hover)] focus:outline-none focus:ring-2 focus:ring-[var(--focus)]"
          >
            Enviar
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default Main;
