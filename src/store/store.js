import { configureStore } from '@reduxjs/toolkit';
import apiSlice from './slice/apiSlice';

import connexion from './slice/connexion';
export const store = configureStore({
  reducer: {
    // Tu peux ajouter tes reducers ici
    api: apiSlice,
    connexion:connexion,


  },
});
