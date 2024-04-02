import { createSlice } from "@reduxjs/toolkit";
import {fetchPosts} from "../actions/postActions.js";
import {fetchComments} from "../actions/commentActions.js";
import {fetchAlbumsAsync} from "../actions/albumActions.js";
import {fetchAlbumPhotosAsync} from "../actions/albumPhotoActions.js"
const initialState = {
  homePosts: [],
  homeAlbumList: [],
  homeComments: [],
  homeAlbumPhoto: [],
  loading: false,
  mobileCheck: 6,
  openError: true,
  openImage: false,
  imageLink: null,
  error: null,
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    // setSelectedPostId(state, action){
    //       state.selectedPostId = action.payload;
    // },
    // setSelectedAlbumId(state, action){
    //   state.selectedAlbumId = action.payload;
    // },
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
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchPosts.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.loading = false;
          state.homePosts = action.payload.slice(0,2);
          state.openError = false;
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.loading = true;
          state.error = action.payload+"posts";
        })
      
      .addCase(fetchAlbumsAsync.pending, (state) => {
        //state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlbumsAsync.fulfilled, (state, action) => {
        //state.loading = false;
        state.homeAlbumList = action.payload.slice(0,2);
      })
      .addCase(fetchAlbumsAsync.rejected, (state, action) => {
        //state.loading = true;
        state.error = action.payload+"albumList";
      })
      .addCase(fetchComments.pending, (state) => {
          //state.loading = true;
          state.error = null;
        })
        .addCase(fetchComments.fulfilled, (state, action) => {
          //state.loading = false;
          state.homeComments = action.payload.slice(0,10);
          state.openError = false;
        })
        .addCase(fetchComments.rejected, (state, action) => {
          //state.loading = true;
          state.error = action.payload+"comments";
        })
       .addCase(fetchAlbumPhotosAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlbumPhotosAsync.fulfilled, (state, action) => {
        state.homeAlbumPhoto = (state.homeAlbumPhoto.concat(action.payload.albumPhoto.slice(0,1)));
        state.loading = false;
      })
      .addCase(fetchAlbumPhotosAsync.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload+"albumPhoto or currentAlbum";
      })
  },
});

export const { setOpenError, setOpenImage, setImageLink, setMobileCheck } = homePageSlice.actions;

export default homePageSlice.reducer;
