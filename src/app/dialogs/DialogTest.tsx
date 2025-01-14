import React from 'react';
import { registerDialog } from '~/provider/DialogProvider';

const DialogTest: React.FC<{ id: string | null }> = ({ id }) => {
  return (
    <div>
      <h2>Modal Test</h2>
      <p>ID: {id}</p>
    </div>
  );
};

// Siempre es necesario registrar el diálogo, sino no se mostrará
registerDialog('modalTest', DialogTest);

export default DialogTest;
