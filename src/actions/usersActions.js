/**
 * This module exports the `fetchUserList` function, which is an asynchronous
 * action creator that uses `createAsyncThunk` from Redux Toolkit.
 *
 * The thunk is used to fetch a list of users. If the `fetchUserList` function
 * receives a `categoryId` argument, it will fetch the users associated with
 * that category, otherwise, it will fetch all users.
 *
 * The API response data is returned if the request is successful. If an error
 * occurs, the thunk returns the error message.
 *
 * The thunk has a type of 'users/fetchUserList' or 'homePage/fetchUserList'.
 */
// Import createAsyncThunk from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';

// Import getUsers function from ResponseInterceptor.js
import { getUsers } from "../components/ResponseInterceptor.js";

// Use createAsyncThunk to create an action creator that performs an async request to fetch the user list
export const fetchUserList = createAsyncThunk(
  // Set the type prefix for the action creator as 'users/fetchUserList'
  'users/fetchUserList',
  // Define the payload creator function that takes in the argument (which we don't use in this case) and the ThunkAPI object
  async (_, { rejectWithValue }) => {
    // Try to make a request to get the users using the getUsers function
    try {
      const response = await getUsers();
      // Return the data from the response if successful
      return response.data;
    } catch (error) {
      // If there's an error, return the error message using rejectWithValue
      return rejectWithValue(error.message);
    }
  }
);
export default  fetchUserList;