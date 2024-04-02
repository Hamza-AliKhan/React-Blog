/**
 * This module contains the `fetchAlbumPhotosAsync` function, which is an asynchronous
 * action creator that uses `createAsyncThunk` from Redux Toolkit.
 * This function dispatches a 'albumPhotos/fetchAlbumPhotosAsync' or
 * 'homePage/fetchAlbumPhotosAsync' action, depending on the input argument,
 * with/without postId with the fetched albums as the payload.
 * If an error occurs during the fetch request, the thunk will dispatch
 * a rejected action with the error message as the payload.
 */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { viewAlbums, viewPhotos } from "../components/ResponseInterceptor.js";

export const fetchAlbumPhotosAsync = createAsyncThunk(
    'albumPhotos/fetchAlbumPhotosAsync'||'homePage/fetchAlbumPhotosAsync',
    async (postId, { rejectWithValue }) => {
        try {
          const [albumResponse, photoResponse] = await Promise.all([viewAlbums(postId),viewPhotos(postId)]);
          return { currentAlbum: albumResponse.data, albumPhoto: photoResponse.data };
        } catch (error) {
          return rejectWithValue(error.message);
        }
      }
);

export default fetchAlbumPhotosAsync;
