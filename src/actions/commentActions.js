/**
 * This module contains the `fetchComments` function, which is an asynchronous
 * action creator that uses `createAsyncThunk` from Redux Toolkit.
 * This function dispatches a 'comments/fetchComments' or 'homePage/fetchComments' 
 * or 'postView/fetchComments' action with/without postId with the fetched comments as the payload.
 * If an error occurs during the fetch request, the thunk will dispatch
 * a rejected action with the error message as the payload.
 */
// Import createAsyncThunk from Redux Toolkit
import { createAsyncThunk } from '@reduxjs/toolkit';

// Import getComments and viewComments functions from ResponseInterceptor.js
import { getComments, viewComments } from '../components/ResponseInterceptor.js';

// Define the fetchComments function using createAsyncThunk
export const fetchComments = createAsyncThunk(
  'comments/fetchComments' || 'homePage/fetchComments' || 'postView/fetchComments',
  async (postId, { rejectWithValue }) => {
    try {
      // If postId is provided, call viewComments with postId, otherwise call getComments
      const response = postId? await viewComments(postId,true) : await getComments();
      // Return the data from the response
      return response.data;
    } catch (error) {
      // If an error occurs, return the error message using rejectWithValue
      return rejectWithValue(error.message);
    }
  }
);

// Export fetchComments as the default export for this module
export default fetchComments;