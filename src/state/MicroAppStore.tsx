import authSlice from './slices/authSlice';
import userSlice from './slices/userDataSlice';

const microappslices = {
  // Aquí se van a ir agregando los slices personalizados de la aplicación.
  auth: authSlice,
  user: userSlice,
};

export default microappslices;
