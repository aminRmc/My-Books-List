import { createSlice } from '@reduxjs/toolkit';

// Function to load state from localStorage
// const loadFromLocalStorage = () => {
//   if (typeof window !== 'undefined') {
//     const serializedState = localStorage.getItem('formState');
//     // If there is no saved state, return a default state object
//     if (serializedState === null) return { value: 1, tab: [], con: 0, user: [] };
//     // Parse the saved state and return it
//     return JSON.parse(serializedState);
//   } else {
//     // Return the default initial state if executed on the server side
//     return { value: 1, tab: [], con: 0, user: [] };
//   }
// };

// // Function to save state to localStorage
// const saveToLocalStorage = (state) => {
//   if (typeof window !== 'undefined') {
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem('formState', serializedState);
//   } else {
//     console.log("localStorage is not available in this environment.");
//     // Consider alternative persistent state management here
//   }
// };

// Load the initial state from localStorage
const initialState ={value: 1, tab: [], con: 0, user: []};
//  loadFromLocalStorage();


// Create a slice with reducers to handle actions
export const connexion = createSlice({
  name: 'form',
  initialState,
  reducers: {
    // Actions...
    register: (state, action) => {
      state.tab.push(action.payload);
      // saveToLocalStorage(state);
    },
    login: (state) => {
      state.value = 0;
      // saveToLocalStorage(state);
    },
    reg: (state) => {
      state.value = 1;
      // saveToLocalStorage(state);
    },
    connect: (state) => {
      state.con = 1;
      // saveToLocalStorage(state);
    },
    disconnect: (state) => {
      state.con = 0;
      state.user = [];
      // saveToLocalStorage(state);
    },
    info: (state, action) => {
      state.user.push(action.payload);
      // saveToLocalStorage(state);
    },
    addfav: (state, action) => {
      state.user[0].fav.push(action.payload);
      // saveToLocalStorage(state);
    },
    removefav: (state, action) => {
      state.user[0].fav.splice(action.payload, 1);
      // saveToLocalStorage(state);
    },
  },
});

// Export actions for use in the application
export const { register, login, reg, connect, disconnect, info, addfav, removefav } = connexion.actions;

// Export the reducer for store configuration
export default connexion.reducer;
