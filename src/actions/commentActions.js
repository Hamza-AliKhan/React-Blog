import { createAsyncThunk } from '@reduxjs/toolkit';
import { getComments, viewComments } from '../components/ResponseInterceptor.js';

export const fetchComments = createAsyncThunk(
    'comments/fetchComments'||'homePage/fetchComments'||'postView/fetchComments',
    async (postId, { rejectWithValue }) => {
        try {
          if(postId){
          const response = await viewComments(postId);
          return response.data;
          }else{
          const response = await getComments();  
          return response.data;
          }
        } catch (error) {
          return rejectWithValue(error.message);
        }
      }
);

export default fetchComments;

