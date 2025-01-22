import React from 'react';
import { useForm } from 'react-hook-form';
import { FormState } from '~/form/fields';
import LoginPageUi from '~/utils/LoginPageUi';

const LoginPage: React.FC = () => {
  const onSubmit = (_data: FormState) => {
    console.log(_data);
  };

  const methods = useForm<FormState>({
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  return <LoginPageUi onSubmit={onSubmit} methods={methods} />;
};

export default LoginPage;
