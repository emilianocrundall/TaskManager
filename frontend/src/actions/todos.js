import {
    ADD_CATEGORY,
    CATEGORIES,
    CATEGORY,
    TASK_BY_CATEGORY,
    TASKS,
    TASK_DETAIL,
    ADD_TASK,
    DELETE_TASK,
    UPDATE_TASK,
    TODAY_TASKS,
    GET_ALERTS,
    LOADING_CONTENT,
    DONE_TASKS,
    MARK_AS_DONE,
    MARK_AS_NOT_DONE
} from './types'
import axios from 'axios'
import { token_config } from './auth'

export const add_category = (cat) => (dispatch, getState) => {
    axios
    .post('/api/tasks/categories/add/', cat, token_config(getState))
    .then((res) => {
        dispatch({
            type: ADD_CATEGORY,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const get_categories = () => (dispatch, getState) => {
    axios
    .get('/api/tasks/categories/', token_config(getState))
    .then((res) => {
        dispatch({
            type: CATEGORIES,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const get_category = (id) => (dispatch, getState) => {
    axios
    .get(`/api/tasks/categories/${id}/`, token_config(getState))
    .then((res) => {
        dispatch({
            type: CATEGORY,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const get_tasks_by_cat = (id) => (dispatch, getState) => {
    axios
    .get(`/api/category_tasks/${id}/`, token_config(getState))
    .then((res) => {
        dispatch({
            type: TASK_BY_CATEGORY,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const tasks = () => (dispatch, getState) => {
    axios
    .get('/api/tasks/', token_config(getState))
    .then((res) => {
        dispatch({
            type: TASKS,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const get_task_detail = (id) => (dispatch, getState) => {
    dispatch({type: LOADING_CONTENT})
    axios
    .get(`/api/tasks/${id}/`, token_config(getState))
    .then((res) => {
        dispatch({
            type: TASK_DETAIL,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const add_task = (task) => (dispatch, getState) => {
    axios
    .post('/api/add_task/', task, token_config(getState))
    .then((res) => {
        dispatch({
            type: ADD_TASK,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const delete_task = (id) => (dispatch, getState) => {
    axios
    .delete(`api/tasks/${id}/delete/`, token_config(getState))
    .then((res) => {
        dispatch({
            type: DELETE_TASK,
            payload: id
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const update_task = (id, task) => (dispatch, getState) => {
    dispatch({type: LOADING_CONTENT})
    axios
    .put(`/api/tasks/${id}/update/`, task, token_config(getState))
    .then((res) => {
        dispatch({
            type: UPDATE_TASK,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const get_today_tasks = () => (dispatch, getState) => {
    axios
    .get('/api/today_tasks/', token_config(getState))
    .then((res) => {
        dispatch({
            type: TODAY_TASKS,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const get_alerts = () => (dispatch, getState) => {
    axios
    .get('/api/alerts/', token_config(getState))
    .then((res) => {
        dispatch({
            type: GET_ALERTS,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const get_done_tasks = () => (dispatch, getState) => {
    axios
    .get('/api/done_tasks/', token_config(getState))
    .then((res) => {
        dispatch({
            type: DONE_TASKS,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const mark_as_done = (id) => (dispatch, getState) => {
    axios
    .put(`/api/mark_as_done/${id}/`, null, token_config(getState))
    .then((res) => {
        dispatch({
            type: MARK_AS_DONE,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const mark_as_not_done = (id) => (dispatch, getState) => {
    axios
    .put(`/api/mark_as_not_done/${id}/`, null, token_config(getState))
    .then((res) => {
        dispatch({
            type: MARK_AS_NOT_DONE,
            payload: id
        })
    }).catch((err) => {
        console.log(err)
    })
}