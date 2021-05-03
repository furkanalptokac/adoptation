import {
    REPORT_ERROR,
    GET_REPORTS,
    ADD_REPORT
} from '../actions/types'

const initialState = {
    reports: [],
    loading: true,
    error: {}
}

function reportReducer (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_REPORTS:
            return {
                ...state,
                reports: payload,
                loading: false
            }
        case ADD_REPORT:
            return {
                ...state,
                reports: [payload, ...state.reports],
                loading: false
            }
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
