import {
    REPORT_ERROR
} from '../actions/types'

const initialState = {
    loading: true,
    error: {}
}

function reportReducer (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case REPORT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state
    }
}

export default reportReducer