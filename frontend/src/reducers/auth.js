import {
    LOAD_USER,
    LOADING,
    REGISTER_USER,
    LOGIN_USER,
    LOGIN_FAIL,
    REGISTER_FAIL,
    LOGOUT_SUCCESS,
    LOAD_USER_ERROR
} from '../actions/types'

const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    loading: true,
    isAuthenticated: false,
    error: false
}

export default function(state=initialState, action){
    switch(action.type){
        case LOADING:
            return{
                ...state, loading: true
            }
        case LOAD_USER:
            return{
                ...state,
                user: action.payload,
                loading: false,
                isAuthenticated: true,
                error: false
            }
        case LOGIN_USER:
        case REGISTER_USER:
            localStorage.setItem('token', action.payload.token)
            return{
                ...state,
                ...action.payload,
                loading: false,
                isAuthenticated: true,
                error: false,
            }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            localStorage.removeItem('token')
            return{
                ...state,
                loading: false,
                isAuthenticated: false,
                error: action.payload
            }
        case LOAD_USER_ERROR:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token')
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                user: null,
                loading: false,
                error: false
            }
        default:
            return state
    }
}