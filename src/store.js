import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

import headerReducer from  './slices/headerSlice.js';
import homePageReducer from './slices/homePageSlice.js';
import postReducer from './slices/postSlice.js';
import commentsReducer from './slices/commentsSlice.js';
import albumsReducer from "./slices/albumSlice.js";
import albumPhotoReducer from './slices/albumPhotoSlice.js';
import postViewReducer from './slices/postViewSlice.js';
import usersReducer from './slices/usersSlice.js';
import photoReducer from './slices/photoSlice.js';

const POSTlist = combineReducers({
posts: postReducer,
postView: postViewReducer,
});

const rootReducer = combineReducers({
  header :headerReducer,
  homePage: homePageReducer,
  postList: POSTlist,
  commentList: commentsReducer,
  albums: albumsReducer,
  albumPhotos: albumPhotoReducer,
  photos: photoReducer,
  users: usersReducer
});

const store = configureStore({
  reducer: {app:rootReducer},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: true,
});

export default store;