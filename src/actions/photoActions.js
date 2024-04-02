/**
 * This module exports the `fetchPhotoList` function, which is an asynchronous
 * action creator that uses `createAsyncThunk` from Redux Toolkit.
 * The thunk is used to fetch a list of photos. The API response data is
 * returned if the request is successful. If an error occurs, the thunk
 * returns the error message.
 * The thunk has a type of 'photos/fetchPhotoList' or 'homePage/fetchPhotoList'.
 */
// Import createAsyncThunk from Redux Toolkit
import { createAsyncThunk } from '@reduxjs/toolkit';

// Import getPhotos function from ResponseInterceptor.js
import { getPhotos } from "../components/ResponseInterceptor.js";

// Define an asynchronous thunk using createAsyncThunk
// This thunk is used to fetch a list of photos
// The thunk has a type of 'photos/fetchPhotoList' or 'homePage/fetchPhotoList'
export const fetchPhotoList = createAsyncThunk(
    'photos/fetchPhotoList' || 'homePage/fetchPhotoList',
    // The payload creator is an async function that fetches photos using getPhotos
    // It returns the data property of the response if the request is successful
    // Or it returns the error message if the request fails
    async (_, { rejectWithValue }) => {
        try {
          const response = await getPhotos();
          return response.data;
        } catch (error) {
          // If the request fails, we use rejectWithValue to return an error message
          return rejectWithValue(error.message);
        }
      }
);

// Export the fetchPhotoList thunk as the default export
export default fetchPhotoList;
