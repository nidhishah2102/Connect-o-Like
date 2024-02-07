import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  loginSuccess,
  loginFailure,
  logOut,
  updateProfilePicture,
} from "./reducers/auth";
const BASE_URL = "http://localhost:4000/api";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      config.headers.Authorization = `${userToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      const user = response.data;
      dispatch(loginSuccess(user));

      return response;
    } catch (error) {
      dispatch(loginFailure(error.response || "Login failed"));
      return rejectWithValue(error.response.data.error || "Login failed");
    }
  }
);
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, userData);
      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message || "Registration failed");
    }
  }
);
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch }) => {
    try {
      localStorage.removeItem("userToken");
      dispatch(logOut());
    } catch (error) {
      console.error(error);
      // Handle logout failure if needed
    }
  }
);
export const getUser = createAsyncThunk(
  "auth/loginUser",
  async ({ userId }, { dispatch, rejectWithValue }) => {
    try {
      console.log(userId);
      const response = await axiosInstance.get(`${BASE_URL}/user/${userId}`);

      return response;
    } catch (error) {
      dispatch(loginFailure(error.response || "Login failed"));
      return rejectWithValue(error.response.data.error || "Login failed");
    }
  }
);
export const uploadProfilePicture = createAsyncThunk(
  "user/uploadProfilePicture",
  async ({ userId, file }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/user/profile/${userId}`,
        file
      );
      console.log(response);
      dispatch(updateProfilePicture(response.data.profile));
      return response.data;
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      return rejectWithValue(error.response?.data?.error || "Upload failed");
    }
  }
);
export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ userId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/user/${userId}`,
        updatedData
      );
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Update failed");
    }
  }
);
export const searchUsers = createAsyncThunk(
  "users/searchUsers",
  async ({ skills, experience, domain }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/user/search`, {
        params: {
          skills,
          experience,
          domain,
        },
      });

      return response.data.users;
    } catch (error) {
      console.error(
        "Error searching users:",
        error.response?.data || error.message
      );
      return rejectWithValue(error.response?.data || "Search failed");
    }
  }
);
export const sendConnectionRequest = createAsyncThunk(
  "connection/sendConnectionRequest",
  async ({ receiverId }, { rejectWithValue }) => {
    try {
      // Make the POST request to your API endpoint
      const response = await axiosInstance.post(
        `${BASE_URL}/user/send-connection-request/${receiverId}`
      );

      // Return the response data if successful
      return response.data;
    } catch (error) {
      // If an error occurs, return the error message
      return rejectWithValue(error.response?.data || "Connection failed");
    }
  }
);
export const fetchSingleUserProfile = createAsyncThunk(
  "user/fetchSingleUserProfile",
  async (userId, { rejectWithValue }) => {
    try {
      // Make the GET request to fetch the user's profile details
      const response = await axiosInstance.get(
        `${BASE_URL}/user/public/${userId}`
      );

      // Return the response data
      // console.log(response);
      return response.data;
    } catch (error) {
      // If an error occurs, return the error message
      return rejectWithValue(
        error.response?.data || "Failed to fetch user profile"
      );
    }
  }
);
export const fetchConnectionReq = createAsyncThunk(
  "user/fetchSingleUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      // Make the GET request to fetch the user's profile details
      const response = await axiosInstance.get(
        `${BASE_URL}/user/getconnection`
      );
      console.log(response);
      return response.data;
    } catch (error) {
      // If an error occurs, return the error message
      return rejectWithValue(error.response?.data || "Failed to fetch");
    }
  }
);
export const acceptConnectionRequests = createAsyncThunk(
  "user/acceptConnectionRequests",
  async (requestId, { rejectWithValue }) => {
    try {
      // Make the GET request to fetch the user's profile details
      const response = await axiosInstance.post(
        `${BASE_URL}/user//accept-request/${requestId}`
      );
      return response.data;
    } catch (error) {
      // If an error occurs, return the error message
      return rejectWithValue(error.response?.data || "Failed to fetch");
    }
  }
);
export const rejectConnectionRequests = createAsyncThunk(
  "user/rejectConnectionRequests",
  async (requestId, { rejectWithValue }) => {
    try {
      // Make the GET request to fetch the user's profile details
      const response = await axiosInstance.post(
        `${BASE_URL}/user/reject-request/${requestId}`
      );
      return response.data;
    } catch (error) {
      // If an error occurs, return the error message
      return rejectWithValue(error.response?.data || "Failed to fetch");
    }
  }
);
export const fetchConnections = createAsyncThunk(
  "user/fetchSingleUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      // Make the GET request to fetch the user's profile details
      const response = await axiosInstance.get(
        `${BASE_URL}/user/connectedusers`
      );
      return response.data;
    } catch (error) {
      // If an error occurs, return the error message
      return rejectWithValue(error.response?.data || "Failed to fetch");
    }
  }
);
