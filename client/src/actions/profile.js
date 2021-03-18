import axios from 'axios';
import { setAlert } from './alert';

import { 
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    ACCOUNT_DELETED,
    GET_PROFILES
} from './types';

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE })

    try {
        const res = await axios.get('api/profile/')
        // console.log(res.data)
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profil güncellendi.' : 'Profil oluşturuldu.', 'success'));

        if (!edit) {
            history.push('/dashboard');
        } 
    } catch (err) {
        const errors = err.response.data.errors;
        
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

export const getProfileById = (userId) => async dispatch => {
    try {
        const res = await axios.get(`api/profile/user/${userId}`)

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const deleteAccount = id => async dispatch => {
    if (window.confirm('Hesabınızı silmek istediğinizden emin misiniz?')) {
        try {
            await axios.delete(`api/profile/`);
    
            dispatch({ type: CLEAR_PROFILE });
            dispatch({ type: ACCOUNT_DELETED });

            dispatch(setAlert('Hesabınız kalıcı olarak silindi.'));
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
    
}