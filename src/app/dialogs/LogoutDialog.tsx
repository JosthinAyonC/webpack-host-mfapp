import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Dialog } from '~/components/ui/Dialog';
import { Button } from '~/form/fields';
import { useDialog } from '~/hooks';

import { logout } from '../../state/slices/authSlice';

export const LogoutDialog: React.FC<{ keyId: string; value: string | null }> = ({ keyId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeDialog } = useDialog();

  const handleLogout = () => {
    dispatch(logout());
    navigate('auth/login');
  };

  return (
    <Dialog keyId={keyId}>
      <h2 className="text-xl font-bold text-[var(--font)] mb-4">¿Cerrar sesión?</h2>
      <p className="text-[var(--font)] mb-6">Estás a punto de cerrar sesión. ¿Estás seguro?</p>
      <div className="flex justify-center gap-4">
        <Button onClick={handleLogout}>Cerrar sesión</Button>
        <Button variant="outline" onClick={() => closeDialog(keyId)}>
          Cancelar
        </Button>
      </div>
    </Dialog>
  );
};
