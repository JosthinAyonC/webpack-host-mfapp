import React from 'react';
import { registerDialog } from '~/provider/DialogProvider';

const DialogTest2: React.FC<{ id: string | null }> = ({ id }) => {
  return (
    <div>
      <h2>Modal Test 2</h2>
      <p>ID: {id}</p>
    </div>
  );
};

// Siempre es necesario registrar el diálogo, sino no se mostrará
registerDialog('changelog', DialogTest2);

export default DialogTest2;
