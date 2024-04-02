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
