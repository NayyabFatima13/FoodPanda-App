import {
    createContext,
    useContext,
    useReducer
} from "react";

import {
    themeReducer,
    initialState
} from "./reducers/themeReducer";


const ThemeContext = createContext();


export function ThemeProvider({ children }) {

    const [state, dispatch] = useReducer(
        themeReducer,
        initialState
    );


    const toggleTheme = () => {

        dispatch({
            type: "TOGGLE_THEME"
        });

    };


    const setTheme = (theme) => {

        dispatch({
            type: "SET_THEME",
            payload: theme
        });

    };


    return (
        <ThemeContext.Provider
            value={{
                theme: state.theme,
                toggleTheme,
                setTheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    );

}


export function useTheme() {

    return useContext(ThemeContext);

}


export default ThemeProvider;