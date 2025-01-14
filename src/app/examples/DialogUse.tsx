import React from 'react';
import { useDialog } from '~/provider/DialogProvider';

import { TestDialogProvider } from '../dialogs/DialogTest';

export const DialogUse = () => {
  const { openDialog } = useDialog();

  return (
    <div>
      {/* Siempre que queremos que un modal se encuentre disponible en alguna parte, debemos definir el provider */}
      <TestDialogProvider />
      <button onClick={() => openDialog('modalTest', '12345')}>Open Modal Test</button>
    </div>
  );
};
