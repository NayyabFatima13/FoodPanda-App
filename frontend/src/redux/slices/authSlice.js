import { createSlice } from "@reduxjs/toolkit";


function getInitialUser() {

    try {

        const savedUser =
            localStorage.getItem("user");

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


            localStorage.setItem(
                "user",
                JSON.stringify(newUser)
            );


            state.user = newUser;
            state.error = null;

        },


        // SET USER AFTER LOGIN
        setUser: (state, action) => {

            state.user = action.payload;
            state.error = null;

        },


        // SET ERROR
        setError: (state, action) => {

            state.error = action.payload;

        },


        // LOGOUT
        logout: (state) => {

            localStorage.removeItem("user");

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

        const savedUser =
            localStorage.getItem("user");


        if (!savedUser) {

            return {
                success: false,
                message:
                    "No account found. Please register first."
            };

        }


        const existingUser =
            JSON.parse(savedUser);


        if (
            existingUser.email !== email ||
            existingUser.password !== password
        ) {

            return {
                success: false,
                message:
                    "Invalid email or password."
            };

        }


        dispatch(
            setUser(existingUser)
        );


        return {
            success: true
        };

    };

};


export default authSlice.reducer;