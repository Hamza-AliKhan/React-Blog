import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from "../components/ResponseInterceptor.js";

export const fetchUserList = createAsyncThunk(
    'users/fetchUserList',
    async (_, { rejectWithValue }) => {
        try {
          const response = await getUsers();
          return response.data;
        } catch (error) {
          return rejectWithValue(error.message);
        }
      }
);

export default fetchUserList;
