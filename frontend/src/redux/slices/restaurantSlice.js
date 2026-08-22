import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import axios from "axios";


// ==========================================
// BASE URL
// ==========================================

const API_URL =
  import.meta.env.VITE_API_URL;


// ==========================================
// GET ALL RESTAURANTS
// PUBLIC
// ==========================================

export const fetchRestaurants =
  createAsyncThunk(

    "restaurants/fetchRestaurants",

    async (_, { rejectWithValue }) => {

      try {

        const response =
          await axios.get(
            `${API_URL}/api/restaurants`
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


// ==========================================
// CREATE RESTAURANT
// PROTECTED
// ==========================================

export const createRestaurant =
  createAsyncThunk(

    "restaurants/createRestaurant",

    async (restaurantData, { rejectWithValue }) => {

      try {

        const token =
          localStorage.getItem("token");


        const response =
          await axios.post(

            `${API_URL}/api/restaurants`,

            restaurantData,

            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }

          );


        return response.data.data;

      } catch (error) {

        return rejectWithValue(
          error.response?.data?.message ||
          "Failed to create restaurant"
        );

      }

    }

  );


// ==========================================
// UPDATE RESTAURANT
// PROTECTED
// ==========================================

export const updateRestaurant =
  createAsyncThunk(

    "restaurants/updateRestaurant",

    async (
      { id, restaurantData },
      { rejectWithValue }
    ) => {

      try {

        const token =
          localStorage.getItem("token");


        const response =
          await axios.put(

            `${API_URL}/api/restaurants/${id}`,

            restaurantData,

            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }

          );


        return response.data.data;

      } catch (error) {

        return rejectWithValue(
          error.response?.data?.message ||
          "Failed to update restaurant"
        );

      }

    }

  );


// ==========================================
// DELETE RESTAURANT
// PROTECTED
// ==========================================

export const deleteRestaurant =
  createAsyncThunk(

    "restaurants/deleteRestaurant",

    async (id, { rejectWithValue }) => {

      try {

        const token =
          localStorage.getItem("token");


        await axios.delete(

          `${API_URL}/api/restaurants/${id}`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        );


        return id;

      } catch (error) {

        return rejectWithValue(
          error.response?.data?.message ||
          "Failed to delete restaurant"
        );

      }

    }

  );


// ==========================================
// INITIAL STATE
// ==========================================

const initialState = {

  restaurants: [],

  loading: false,

  error: null,

  searchText: "",

};


// ==========================================
// SLICE
// ==========================================

const restaurantSlice = createSlice({

  name: "restaurants",

  initialState,

  reducers: {

    setSearchText: (state, action) => {

      state.searchText =
        action.payload;

    },


    clearSearch: (state) => {

      state.searchText = "";

    },

  },


  extraReducers: (builder) => {

    builder


      // ====================================
      // FETCH
      // ====================================

      .addCase(
        fetchRestaurants.pending,
        (state) => {

          state.loading = true;

          state.error = null;

        }
      )


      .addCase(
        fetchRestaurants.fulfilled,
        (state, action) => {

          state.loading = false;

          state.restaurants =
            action.payload;

        }
      )


      .addCase(
        fetchRestaurants.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload;

        }
      )


      // ====================================
      // CREATE
      // ====================================

      .addCase(
        createRestaurant.pending,
        (state) => {

          state.loading = true;

          state.error = null;

        }
      )


      .addCase(
        createRestaurant.fulfilled,
        (state, action) => {

          state.loading = false;

          state.restaurants.push(
            action.payload
          );

        }
      )


      .addCase(
        createRestaurant.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload;

        }
      )


      // ====================================
      // UPDATE
      // ====================================

      .addCase(
        updateRestaurant.pending,
        (state) => {

          state.loading = true;

          state.error = null;

        }
      )


      .addCase(
        updateRestaurant.fulfilled,
        (state, action) => {

          state.loading = false;


          const index =
            state.restaurants.findIndex(
              (restaurant) =>
                restaurant.id ===
                action.payload.id
            );


          if (index !== -1) {

            state.restaurants[index] =
              action.payload;

          }

        }
      )


      .addCase(
        updateRestaurant.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload;

        }
      )


      // ====================================
      // DELETE
      // ====================================

      .addCase(
        deleteRestaurant.pending,
        (state) => {

          state.loading = true;

          state.error = null;

        }
      )


      .addCase(
        deleteRestaurant.fulfilled,
        (state, action) => {

          state.loading = false;


          state.restaurants =
            state.restaurants.filter(
              (restaurant) =>
                restaurant.id !==
                action.payload
            );

        }
      )


      .addCase(
        deleteRestaurant.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload;

        }
      );

  },

});


export const {
  setSearchText,
  clearSearch
} = restaurantSlice.actions;


export default restaurantSlice.reducer;