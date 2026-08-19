import { createSlice } from "@reduxjs/toolkit";


// Get currently logged-in user
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


const initialState = {

    user: getInitialUser(),

    error: null

};


const authSlice = createSlice({

    name: "auth",

    initialState,

    reducers: {

        // REGISTER
        register: (state, action) => {

            const userData = action.payload;


            const newUser = {

                name: userData.name,

                email: userData.email,

                password: userData.password

            };


            // Get already registered users
            const savedUsers =
                JSON.parse(
                    localStorage.getItem("registeredUsers")
                ) || [];


            // Add new user
            savedUsers.push(newUser);


            // Save all registered users
            localStorage.setItem(
                "registeredUsers",
                JSON.stringify(savedUsers)
            );


            // Make this user the currently logged-in user
            localStorage.setItem(
                "currentUser",
                JSON.stringify(newUser)
            );


            state.user = newUser;

            state.error = null;

        },


        // SET USER AFTER LOGIN
        setUser: (state, action) => {

            const user = action.payload;


            localStorage.setItem(
                "currentUser",
                JSON.stringify(user)
            );


            state.user = user;

            state.error = null;

        },


        // SET ERROR
        setError: (state, action) => {

            state.error = action.payload;

        },


        // LOGOUT
        logout: (state) => {

            // Only remove current login session
            localStorage.removeItem("currentUser");


            // DO NOT remove registeredUsers

            state.user = null;

            state.error = null;

        }

    }

});


export const {

    register,

    setUser,

    setError,

    logout

} = authSlice.actions;



// LOGIN
export const login = (email, password) => {

    return (dispatch) => {


        // Get all registered users
        const savedUsers =
            JSON.parse(
                localStorage.getItem("registeredUsers")
            ) || [];


        // Check whether account exists
        const existingUser =
            savedUsers.find(
                (user) =>
                    user.email === email
            );


        // No account
        if (!existingUser) {

            return {

                success: false,

                message:
                    "No account found. Please register first."

            };

        }


        // Wrong password
        if (
            existingUser.password !== password
        ) {

            return {

                success: false,

                message:
                    "Invalid email or password."

            };

        }


        // Login successful
        dispatch(
            setUser(existingUser)
        );


        return {

            success: true

        };

    };

};


export default authSlice.reducer;