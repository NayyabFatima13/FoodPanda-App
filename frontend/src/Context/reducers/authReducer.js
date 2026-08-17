function getInitialUser() {
    try {
        const savedUser = localStorage.getItem("user");

        if (savedUser) {
            return JSON.parse(savedUser);
        }

        return null;

    } catch {
        return null;
    }
}


const initialState = {
    user: getInitialUser()
};


function authReducer(state, action) {

    switch (action.type) {

        case "REGISTER":

            return {
                ...state,
                user: action.payload
            };


        case "LOGIN":

            return {
                ...state,
                user: action.payload
            };


        case "LOGOUT":

            return {
                ...state,
                user: null
            };


        default:
            return state;
    }
}


export {
    initialState,
    authReducer
};