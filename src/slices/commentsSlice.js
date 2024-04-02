import { createSlice } from "@reduxjs/toolkit";
import { fetchComments } from '../actions/commentActions.js';

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
      comments: [],
      loading: false,
      openError: true,
      error: null,
    },
    reducers: {
      setOpenError(state, action){
        state.openError = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchComments.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchComments.fulfilled, (state, action) => {
          state.loading = false;
          state.comments = action.payload;
          state.openError = false;
        })
        .addCase(fetchComments.rejected, (state, action) => {
          state.loading = true;
          state.error = action.payload;
        });
    },
  });

  export const { setOpenError } = commentsSlice.actions;

  export default commentsSlice.reducer;