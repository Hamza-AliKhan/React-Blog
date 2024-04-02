/**
 * This module exports the `fetchPosts` function, which is an asynchronous
 * action creator that uses `createAsyncThunk` from Redux Toolkit.
 * The thunk is used to fetch a list of posts. If the `fetchPosts` function
 * receives a `postId` argument, it will fetch the posts associated with
 * that category, otherwise, it will fetch all posts.
 *
 * The API response data is returned if the request is successful. If an error
 * occurs, the thunk returns the error message.
 * The thunk has a type of 'posts/fetchPosts' or 'homePage/fetchPosts'.
 */
// Import createAsyncThunk from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';

// Import getPosts and viewPosts functions from ResponseInterceptor.js
import { getPosts, viewPosts } from "../components/ResponseInterceptor.js";

// Use createAsyncThunk to create an action creator that performs an async request to fetch posts
export const fetchPosts = createAsyncThunk(
  // Set the type prefix for the action creator as 'posts/fetchPosts' or 'homePage/fetchPosts'
  'posts/fetchPosts'||'homePage/fetchPosts',
  // Define the payload creator function that takes in the argument (which we don't use in this case) and the ThunkAPI object
  async (_, { rejectWithValue }) => {
    // Try to make a request to get the posts using the getPosts function
    try {
      const response = await getPosts();
      // Return the data from the response if successful
      return response.data;
    } catch (error) {
      // If there's an error, return the error message using rejectWithValue
      return rejectWithValue(error.message);
    }
  }
);

// Use createAsyncThunk to create an action creator that performs an async request to fetch a specific post
export const fetchPostView = createAsyncThunk(
  // Set the type prefix for the action creator as 'postView/fetchPostView'
  'postView/fetchPostView',
  // Define the payload creator function that takes in the postId and the ThunkAPI object
  async (postId, { rejectWithValue }) => {
    // Try to make a request to view the specific post using the viewPosts function and pass in the postId
    try {
      const response = await viewPosts(postId);
      // Return the data from the response if successful
      return response.data;
    } catch (error) {
      // If there's an error, return the error message using rejectWithValue
      return rejectWithValue(error.message);
    }
  }
);