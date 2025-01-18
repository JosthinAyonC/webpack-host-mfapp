import React from 'react';
import { useDialog } from '~/hooks';
import { ModalProvider } from '~/provider';

import { DialogTest, DialogTesting } from './DialogTest';

export const DialogUse = () => {
  const { openDialog } = useDialog();

  return (
    <div>
      <ModalProvider keyId="dialogTesting" content={DialogTesting}>
        <ModalProvider keyId="dialogNotificaciones" content={DialogTest}>
          <button onClick={() => openDialog('dialogNotificaciones', '123421')}>Click here to open Modal</button>
        </ModalProvider>
      </ModalProvider>
    </div>
  );
};
