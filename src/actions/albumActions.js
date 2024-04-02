import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAlbums } from "../components/ResponseInterceptor.js";

export const fetchAlbumsAsync = createAsyncThunk(
    'albums/fetchAlbumsAsync', 
    async (_, { rejectWithValue }) => {
        try {
          const response = await getAlbums();
          return response.data;
        } catch (error) {
          return rejectWithValue(error.message);
        }
      }
);

export default fetchAlbumsAsync;
