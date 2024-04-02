import { createSlice } from "@reduxjs/toolkit";
import { fetchAlbumPhotosAsync } from "../actions/albumPhotoActions.js";

const initialState = {
  currentAlbum: null,
  albumPhoto: [],
  itemsPerPage: 10,
  currentPage: 1,
  loading: false,
  mobileCheck: "250px",
  openError: true,
  openImage: false,
  imageLink: null,
  error: null,
};

const albumPhotoSlice = createSlice({
  name: "albumPhotos",
  initialState,
  reducers: {
    setOpenError(state, action){
      state.openError = action.payload;
    },
    setOpenImage(state, action){
        state.openImage = action.payload;
      },
    setImageLink(state, action){
        state.imageLink = action.payload;
      },
    setMobileCheck(state, action){
        state.mobileCheck = action.payload;
    },
    setCurrentPage(state, action){
        state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbumPhotosAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlbumPhotosAsync.fulfilled, (state, action) => {
        state.currentAlbum = action.payload.currentAlbum;
        state.albumPhoto = action.payload.albumPhoto;
        state.loading = false;
      })
      .addCase(fetchAlbumPhotosAsync.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage, setOpenError, setOpenImage, setImageLink, setMobileCheck } = albumPhotoSlice.actions;

export default albumPhotoSlice.reducer;
