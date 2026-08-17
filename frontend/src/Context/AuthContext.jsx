import {
    createContext,
    useContext,
    useReducer
} from "react";

import {
    authReducer,
    initialState
} from "./reducers/authReducer";


const AuthContext = createContext(null);


function AuthProvider({ children }) {

    const [state, dispatch] = useReducer(
        authReducer,
        initialState
    );


    // REGISTER
    const register = (userData) => {

        const newUser = {
            name: userData.name,
            email: userData.email,
            password: userData.password
        };


        localStorage.setItem(
            "user",
            JSON.stringify(newUser)
        );


        dispatch({
            type: "REGISTER",
            payload: newUser
        });
    };


    // LOGIN
    const login = (email, password) => {

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


        dispatch({
            type: "LOGIN",
            payload: existingUser
        });


        return {
            success: true
        };
    };


    // LOGOUT
    const logout = () => {

        localStorage.removeItem("user");


        dispatch({
            type: "LOGOUT"
        });
    };


    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                register,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {

    return useContext(AuthContext);

}


export default AuthProvider;