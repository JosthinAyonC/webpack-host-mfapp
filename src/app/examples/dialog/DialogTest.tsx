import React from 'react';
import { Dialog } from '~/components/ui/Dialog';
import { useDialog } from '~/hooks';

/**
 * Cada componente de diálogo debe manejar las siguientes props:
 *
 * @prop {string} keyId - Identificador único del diálogo. Este se pasa automáticamente
 *        desde el `ModalProvider` y es obligatorio para que el diálogo pueda gestionar
 *        su propio estado en la aplicación.
 *
 * @prop {string | null} [value] - Valor opcional asociado al diálogo, obtenido desde
 *        el query param. Representa información adicional que puede ser utilizada
 *        dentro del contenido del diálogo, como un ID, un identificador de sesión,
 *        o cualquier otro dato relevante.
 *
 * Notas:
 * - `keyId` es esencial para que el diálogo funcione correctamente y debe ser declarado
 *    en el `ModalProvider`.
 * - El `ModalProvider` se encarga de pasar ambos valores (`keyId` y `value`)
 *    automáticamente al componente de diálogo.
 * - Asegúrate de que cada `ModalProvider` tenga un `keyId` único para evitar conflictos
 *    entre los diálogos.
 */
export const DialogTest: React.FC<{ value: string | null; keyId: string }> = ({ keyId, value }) => {
  const { openDialog } = useDialog();

  return (
    <Dialog keyId={keyId}>
      <h2>Test Dialog</h2>
      <p>ID: {value}</p>
      <button onClick={() => openDialog('dialogTesting', '2222')}>Click here to open Modal</button>
    </Dialog>
  );
};

export const DialogTesting: React.FC<{ value: string | null; keyId: string }> = ({ keyId, value }) => {
  return (
    <Dialog keyId={keyId}>
      <h2>Another Test Dialog</h2>
      <p>ID: {value}</p>
    </Dialog>
  );
};
