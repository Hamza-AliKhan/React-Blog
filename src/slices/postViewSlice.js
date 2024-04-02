import { createSlice } from '@reduxjs/toolkit';
import { fetchComments } from '../actions/commentActions.js';
import { fetchPostView } from '../actions/postActions.js';

const initialState = {
  currentPost: [],
  comments:[],
  updatedComments: [],
  loading: false,
  openError: true,
  openAlert: false,
  error: '',
};

const postViewSlice = createSlice({
  name: 'postView',
  initialState,
  reducers: {
    setOpenAlert(state, action) {
      state.openAlert = action.payload;
    },
    setOpenError(state, action) {
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
        state.openError = true;
        state.error = state.error+action.payload+' comments ';
      })
      .addCase(fetchPostView.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostView.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
        state.openError = false;
      })
      .addCase(fetchPostView.rejected, (state, action) => {
        state.loading = true;
        state.openError = true;
        state.error = state.error+action.payload+' postView ';
      });
    },
});

export const { setOpenAlert, setOpenError } = postViewSlice.actions;

export default postViewSlice.reducer;