import React, { useEffect } from 'react';
import { registerDialog } from '~/provider/DialogProvider';

const AnotherTestDialog: React.FC<{ id: string | null }> = ({ id }) => {
  return (
    <div>
      <h2>This is another modal lvl 2</h2>
      <p>ID: {id}</p>
      <p>This is the content of the Test Dialog.</p>
    </div>
  );
};

// Este componente solo registra el diálogo
export const AnotherTestDialogProvider: React.FC = () => {
  useEffect(() => {
    registerDialog('anotherDialogTest', AnotherTestDialog);
  }, []);

  return null;
};
