const initialState = {
    theme: "light"
};


function themeReducer(state, action) {

    switch (action.type) {

        case "TOGGLE_THEME":

            return {
                ...state,
                theme:
                    state.theme === "light"
                        ? "dark"
                        : "light"
            };


        case "SET_THEME":

            return {
                ...state,
                theme: action.payload
            };


        default:
            return state;
    }
}


export {
    initialState,
    themeReducer
};