import { createSlice } from '@reduxjs/toolkit';
import { fetchPhotoList } from '../actions/photoActions';

const initialState = {
  photoList: [],
  itemsPerPage: 10,
  currentPage: 1,
  loading: false,
  mobileCheck: '250px',
  openError: true,
  openImage: false,
  imageLink: null,
  error: null,

};

const PhotoSlice = createSlice({
  name: "photos",
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
      .addCase(fetchPhotoList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPhotoList.fulfilled, (state, action) => {
        state.loading = false;
        state.photoList = action.payload;
      })
      .addCase(fetchPhotoList.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage, setOpenError, setOpenImage, setImageLink, setMobileCheck } = PhotoSlice.actions;

export default PhotoSlice.reducer;

