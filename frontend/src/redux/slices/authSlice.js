import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import axios from "axios";


// ===============================
// INITIAL USER
// ===============================

function getInitialUser() {
  try {
    const savedUser =
      localStorage.getItem("currentUser");

    return savedUser
      ? JSON.parse(savedUser)
      : null;

  } catch {
    return null;
  }
}


// ===============================
// INITIAL TOKEN
// ===============================

function getInitialToken() {
  return localStorage.getItem("token");
}


// ===============================
// REGISTER
// ===============================

export const register = createAsyncThunk(
  "auth/register",

  async (
    { name, email, password },
    { rejectWithValue }
  ) => {

    try {

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          name,
          email,
          password
        }
      );

      return response.data;

    } catch (error) {

      return rejectWithValue(
        error.response?.data?.message ||
        "Registration failed"
      );

    }
  }
);


// ===============================
// LOGIN
// ===============================

export const login = createAsyncThunk(
  "auth/login",

  async (
    { email, password },
    { rejectWithValue }
  ) => {

    try {

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          email,
          password
        }
      );

      return response.data;

    } catch (error) {

      return rejectWithValue(
        error.response?.data?.message ||
        "Login failed"
      );

    }
  }
);


// ===============================
// INITIAL STATE
// ===============================

const initialState = {

  user: getInitialUser(),

  token: getInitialToken(),

  loading: false,

  error: null

};


// ===============================
// SLICE
// ===============================

const authSlice = createSlice({

  name: "auth",

  initialState,

  reducers: {

    logout: (state) => {

      state.user = null;

      state.token = null;

      state.error = null;

      localStorage.removeItem(
        "currentUser"
      );

      localStorage.removeItem(
        "token"
      );
    },

    clearAuthError: (state) => {

      state.error = null;

    }

  },


  extraReducers: (builder) => {

    // =========================
    // REGISTER
    // =========================

    builder

      .addCase(
        register.pending,
        (state) => {

          state.loading = true;

          state.error = null;

        }
      )

      .addCase(
        register.fulfilled,
        (state, action) => {

          state.loading = false;

          state.user =
            action.payload.user;

          state.token =
            action.payload.token;

          state.error = null;


          localStorage.setItem(
            "currentUser",
            JSON.stringify(
              action.payload.user
            )
          );

          localStorage.setItem(
            "token",
            action.payload.token
          );

        }
      )

      .addCase(
        register.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload;

        }
      );


    // =========================
    // LOGIN
    // =========================

    builder

      .addCase(
        login.pending,
        (state) => {

          state.loading = true;

          state.error = null;

        }
      )

      .addCase(
        login.fulfilled,
        (state, action) => {

          state.loading = false;

          state.user =
            action.payload.user;

          state.token =
            action.payload.token;

          state.error = null;


          localStorage.setItem(
            "currentUser",
            JSON.stringify(
              action.payload.user
            )
          );

          localStorage.setItem(
            "token",
            action.payload.token
          );

        }
      )

      .addCase(
        login.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload;

        }
      );

  }

});


export const {
  logout,
  clearAuthError
} = authSlice.actions;


export default authSlice.reducer;








// Auth Slice for frontend without backend integration (commented for reference)

// import { createSlice } from "@reduxjs/toolkit";


// // Get currently logged-in user
// function getInitialUser() {

//     try {

//         const savedUser =
//             localStorage.getItem("currentUser");

//         return savedUser
//             ? JSON.parse(savedUser)
//             : null;

//     } catch {

//         return null;

//     }
// }


// const initialState = {

//     user: getInitialUser(),

//     error: null

// };


// const authSlice = createSlice({

//     name: "auth",

//     initialState,

//     reducers: {

//         // REGISTER
//         register: (state, action) => {

//             const userData = action.payload;


//             const newUser = {

//                 name: userData.name,

//                 email: userData.email,

//                 password: userData.password

//             };


//             // Get already registered users
//             const savedUsers =
//                 JSON.parse(
//                     localStorage.getItem("registeredUsers")
//                 ) || [];


//             // Add new user
//             savedUsers.push(newUser);


//             // Save all registered users
//             localStorage.setItem(
//                 "registeredUsers",
//                 JSON.stringify(savedUsers)
//             );


//             // Make this user the currently logged-in user
//             localStorage.setItem(
//                 "currentUser",
//                 JSON.stringify(newUser)
//             );


//             state.user = newUser;

//             state.error = null;

//         },


//         // SET USER AFTER LOGIN
//         setUser: (state, action) => {

//             const user = action.payload;


//             localStorage.setItem(
//                 "currentUser",
//                 JSON.stringify(user)
//             );


//             state.user = user;

//             state.error = null;

//         },


//         // SET ERROR
//         setError: (state, action) => {

//             state.error = action.payload;

//         },


//         // LOGOUT
//         logout: (state) => {

//             // Only remove current login session
//             localStorage.removeItem("currentUser");


//             // DO NOT remove registeredUsers

//             state.user = null;

//             state.error = null;

//         }

//     }

// });


// export const {

//     register,

//     setUser,

//     setError,

//     logout

// } = authSlice.actions;



// // LOGIN
// export const login = (email, password) => {

//     return (dispatch) => {


//         // Get all registered users
//         const savedUsers =
//             JSON.parse(
//                 localStorage.getItem("registeredUsers")
//             ) || [];


//         // Check whether account exists
//         const existingUser =
//             savedUsers.find(
//                 (user) =>
//                     user.email === email
//             );


//         // No account
//         if (!existingUser) {

//             return {

//                 success: false,

//                 message:
//                     "No account found. Please register first."

//             };

//         }


//         // Wrong password
//         if (
//             existingUser.password !== password
//         ) {

//             return {

//                 success: false,

//                 message:
//                     "Invalid email or password."

//             };

//         }


//         // Login successful
//         dispatch(
//             setUser(existingUser)
//         );


//         return {

//             success: true

//         };

//     };

// };


// export default authSlice.reducer;