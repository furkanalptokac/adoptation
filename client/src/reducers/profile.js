const { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, GET_PROFILES, UPDATE_PASSWORD } = require("../actions/types");

const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    error: {}
};

function profileReducer (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            };
        case UPDATE_PASSWORD:
            return {
                ...state,
                profile: payload,
                loading: false
            };
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                loading: false
            }
        default:
            return state;
    }
}

export default profileReducer;