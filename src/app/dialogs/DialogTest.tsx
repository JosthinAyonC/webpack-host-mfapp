import React, { useEffect } from 'react';
import { registerDialog, useDialog } from '~/provider/DialogProvider';

import { AnotherTestDialogProvider } from './AnotherDialogTest';

// Este es el componente que se renderizará en el modal
const TestDialog: React.FC<{ id: string | null }> = ({ id }) => {
  const { openDialog } = useDialog();
  return (
    <div>
      {/* Siempre que queremos que un modal se encuentre disponible en alguna parte, debemos definir el provider */}
      <AnotherTestDialogProvider />
      <h1>Test Dialog lvl 1</h1>
      <h2>Here we can open another modal</h2>
      <p>ID: {id}</p>
      <p>This is the content of the Test Dialog.</p>
      <button onClick={() => openDialog('anotherDialogTest', '12345')}>Open Modal Test</button>
    </div>
  );
};

// Este es el provider que debemos importar donde se encontrará disponibles nuestros diálogos
export const TestDialogProvider: React.FC = () => {
  useEffect(() => {
    // Este es el key identificador que se usará para abrir el diálogo
    registerDialog('modalTest', TestDialog);
  }, []);

  return null;
};
