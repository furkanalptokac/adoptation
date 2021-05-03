import axios from 'axios'
import { setAlert } from './alert'

import {
    REPORT_ERROR,
    GET_REPORTS,
    ADD_REPORT
} from './types'

export const postReport = report => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({ report: report });

        const res = await axios.post(`/api/report/`, body, config);

        dispatch({
            type: ADD_REPORT,
            payload: res.data
        });

        dispatch(setAlert('Şikayetiniz başarıyla iletildi.', 'success'));
    } catch (err) {
        dispatch({
            type: REPORT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const getReports = () => async dispatch => {
    try {
        const res = await axios.get('/api/report/')

        dispatch({
            type: GET_REPORTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: REPORT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}