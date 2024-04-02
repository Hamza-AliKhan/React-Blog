import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPosts, viewPosts } from "../components/ResponseInterceptor.js";

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts'||'homePage/fetchPosts',
    async (_, { rejectWithValue }) => {
        try {   
          const response = await getPosts();
          return response.data;
        } catch (error) {
          return rejectWithValue(error.message);
        }
      }
);

export const fetchPostView = createAsyncThunk(
      'postView/fetchPostView',
      async (postId,{ rejectWithValue}) => {
        try {   
          const response = await viewPosts(postId);
          return response.data;
        } catch (error) {
          return rejectWithValue(error.message);
        }
      }
);
