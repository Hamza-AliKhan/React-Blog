/**
 * This module contains actions for fetching albums using Redux Toolkit.
 * The `fetchAlbumsAsync` function is a thunk that dispatches the
 * 'albums/fetchAlbumsAsync' action with the fetched albums as the payload.
 * If an error occurs during the fetch request, the thunk will dispatch
 * a rejected action with the error message as the payload.
 */
// Import createAsyncThunk from Redux Toolkit
import { createAsyncThunk } from '@reduxjs/toolkit';

// Import getAlbums function from ResponseInterceptor.js
import { getAlbums } from '../components/ResponseInterceptor.js';

// Define the fetchAlbumsAsync function using createAsyncThunk
export const fetchAlbumsAsync = createAsyncThunk(
  'albums/fetchAlbumsAsync',
  async (_, { rejectWithValue }) => {
    try {
      // Call getAlbums function
      const response = await getAlbums();
      // Return the data from the response
      return response.data;
    } catch (error) {
      // If an error occurs, return the error message using rejectWithValue
      return rejectWithValue(error.message);
    }
  }
);

// Export fetchAlbumsAsync as the default export for this module
export default fetchAlbumsAsync;