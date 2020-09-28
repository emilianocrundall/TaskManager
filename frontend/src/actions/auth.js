import axios from 'axios'
import {
    LOADING,
    LOAD_USER,
    REGISTER_USER,
    LOGIN_USER,
    LOGIN_FAIL,
    REGISTER_FAIL,
    LOGOUT_SUCCESS,
    LOAD_USER_ERROR
} from './types'

export const token_config = (getState) => {
    const token = getState().auth.token
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if(token){
        config.headers['Authorization'] = `Token ${token}`
    }
    return config
}

export const load_user = () => (dispatch, getState) => {
    dispatch({type: LOADING})
    axios
    .get('/api/auth/get_user', token_config(getState))
    .then((res) => {
        dispatch({
            type: LOAD_USER,
            payload: res.data
        })
    }).catch((err) => {
        dispatch({
            type: LOAD_USER_ERROR
        })
    })
}

export const register_user = ({username, email, password}) => (dispatch, getState) => {
    const body = JSON.stringify({username, email, password})
    axios
    .post('/api/auth/register', body, token_config(getState))
    .then((res) => {
        dispatch({
            type: REGISTER_USER,
            payload: res.data
        })
    }).catch((err) => {
        dispatch({
            type: REGISTER_FAIL,
            payload: err.response.data
        })
        console.log(err)
    })
}

export const login = (username, password) => (dispatch, getState) => {
    const body = JSON.stringify({username, password})
    axios
    .post('/api/auth/login', body, token_config(getState))
    .then((res) => {
        dispatch({
            type: LOGIN_USER,
            payload: res.data
        })
    }).catch((err) => {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data
        })
    })
}

export const logout = () => (dispatch, getState) => {
    axios
    .post('/api/auth/logout', null, token_config(getState))
    .then((res) => {
        dispatch({
            type: LOGOUT_SUCCESS
        })
    }).catch((err) => {
        console.log(err)
    })
}