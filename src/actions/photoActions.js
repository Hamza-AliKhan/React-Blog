import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPhotos } from "../components/ResponseInterceptor.js";

export const fetchPhotoList = createAsyncThunk(
    'photos/fetchPhotoList'||'homePage/fetchPhotoList',
    async (_, { rejectWithValue }) => {
        try {
          const response = await getPhotos();
          return response.data;
        } catch (error) {
          return rejectWithValue(error.message);
        }
      }
);

export default fetchPhotoList;
