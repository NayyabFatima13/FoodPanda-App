import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRestaurants = createAsyncThunk(
  "restaurants/fetchRestaurants",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/restaurants`
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch restaurants"
      );
    }
  }
);

const initialState = {
  restaurants: [],
  loading: false,
  error: null,

  // Search state
  searchText: "",
};

const restaurantSlice = createSlice({
  name: "restaurants",

  initialState,

  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },

    clearSearch: (state) => {
      state.searchText = "";
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload;
      })

      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSearchText,
  clearSearch,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;