import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from '../actions/postActions.js';

const postSlice = createSlice({
    name: 'posts',
    initialState: {
      posts: [],
      selectedPostId: null,
      loading: false,
      openError: true,
      error: null,
      
    },
    reducers: {
        setOpenError(state, action){
            state.openError = action.payload;
        },
        setSelectedPostId(state, action){
          state.selectedPostId = action.payload;
        },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchPosts.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.loading = false;
          state.posts = action.payload;
          state.openError = false;
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.loading = true;
          state.error = action.payload;
        });
    },
  });

  export const { setOpenError, setSelectedPostId } = postSlice.actions;

  export default postSlice.reducer;