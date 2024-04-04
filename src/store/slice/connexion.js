import { createSlice } from '@reduxjs/toolkit';

// Function to load state from localStorage
const loadFromLocalStorage = () => {
  const serializedState = localStorage.getItem('formState');
  // If there is no saved state, return a default state object
  if (serializedState === null) return { value: 1, tab: [], con: 0, user: [] };
  // Parse the saved state and return it
  return JSON.parse(serializedState);
};

// Function to save state to localStorage
const saveToLocalStorage = (state) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem('formState', serializedState);
};

// Load the initial state from localStorage
const initialState = loadFromLocalStorage(); 

// Create a slice with reducers to handle actions
export const connexion = createSlice({
  name: 'form',
  initialState,
  reducers: {
    // Action to register new data and save the updated state
    register: (state, action) => {
      state.tab.push(action.payload);
      saveToLocalStorage(state);
    },
    // Action to set login state and save it
    login: (state) => {
      state.value = 0;
      saveToLocalStorage(state);
    },
    // Action to reset login state to default and save it
    reg: (state) => {
      state.value = 1;
      saveToLocalStorage(state);
    },
    // Action to set connection state to connected and save it
    connect: (state) => {
      state.con = 1;
      saveToLocalStorage(state);
    },
    // Action to reset connection state to disconnected, clear user data, and save
    disconnect: (state) => {
      state.con = 0;
      state.user = [];
      saveToLocalStorage(state);
    },
    // Action to add user information and save the updated state
    info: (state, action) => {
      state.user.push(action.payload);
      saveToLocalStorage(state);
    },
    addfav: (state, action) => {
      state.user[0].fav.push(action.payload);
      saveToLocalStorage(state);
    },
    removefav: (state, action) => {
      state.user[0].fav.splice(action.payload,1);
      saveToLocalStorage(state);
    },
    initializeFav: (state, action) => {
      // console.log('initializeFav action payload:', action.payload);
      // Supposons que `user` a une structure où `fav` est un tableau de favoris
      if(state.user && state.user.length > 0) {
        // Met à jour les favoris de l'utilisateur avec ceux fournis
        state.user[0].fav = action.payload.fav;

      }
    },


  },
});

// Export the actions for use in the application
export const { register, login, reg, connect, disconnect, info , addfav ,removefav,initializeFav } = connexion.actions;

// Export the reducer for the store configuration
export default connexion.reducer;
