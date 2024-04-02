import { createSlice } from '@reduxjs/toolkit';
import { fetchUserList } from '../actions/usersActions';

const initialState = {
  userList: [],
  loading: false,
  openError: true,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setOpenError(state, action){
      state.openError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.loading = false;
        state.userList = action.payload;
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      });
  },
});

export const { setOpenError } = usersSlice.actions;

export default usersSlice.reducer;

