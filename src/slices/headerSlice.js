import { createSlice } from "@reduxjs/toolkit";

const headerSlice = createSlice({
    name: 'header',
    initialState: {
      background: 'home',
      darkMode: false,
      transition: true,
      loading: false,
      openDrawer: false,
      openError: true,
      error: null,
      
    },
    reducers: {
        setOpenError(state, action){
            state.openError = action.payload;
        },
        setBackground(state, action){
          state.background = action.payload;
        },
        setDarkMode(state, action){
            state.darkMode = action.payload; 
        },
        setLoading(state, action){
          state.loading = action.payload;
        },
        setOpenDrawer(state, action){
          state.openDrawer = action.payload;
        },
        setTransition(state, action){
          state.transition = action.payload;
        },
    },

  });

  export const { setDarkMode, setBackground, setOpenDrawer, setTransition, setLoading, setOpenError } = headerSlice.actions;

  export default headerSlice.reducer;