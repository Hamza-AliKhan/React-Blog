import { createSlice } from '@reduxjs/toolkit';
import { fetchAlbumsAsync } from '../actions/albumActions';

const initialState = {
  albumList: [],
  selectedAlbumId: null,
  loading: false,
  openError: true,
  error: null,
};

const albumSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {
    setSelectedAlbumId(state, action){
      state.selectedAlbumId = action.payload;
    },
    setOpenError(state, action){
      state.openError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbumsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlbumsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.albumList = action.payload;
      })
      .addCase(fetchAlbumsAsync.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      });
  },
});

export const { setSelectedAlbumId, setOpenError } = albumSlice.actions;

export default albumSlice.reducer;

