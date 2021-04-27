import axios from 'axios'
import { setAlert } from './alert'

import { REPORT_ERROR } from './types'

export const postReport = report => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({ report: report });

        await axios.post(`/api/report/`, body, config);

        dispatch(setAlert('Şikayetiniz başarıyla iletildi.', 'success'));
    } catch (err) {
        dispatch({
            type: REPORT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}