import {
    ADD_CATEGORY,
    CATEGORIES,
    CATEGORY,
    TASK_BY_CATEGORY,
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
} from '../actions/types'

const initialState = {
    categories: [],
    category: {},
    today_tasks: [],
    task_detail: {},
    task_by_category: [],
    alert_tasks: [],
    loading_content: false,
    done_tasks: []
}

export default function(state=initialState, action){
    switch(action.type){
        case ADD_CATEGORY:
            return {
                ...state,
                categories:[
                    ...state.categories,
                    action.payload
                ]
            }
        case CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        case CATEGORY:
            return {
                ...state,
                category: action.payload
            }
        case TASK_BY_CATEGORY:
            return {
                ...state,
                task_by_category: action.payload
            }
        case TASK_DETAIL:
            return {
                ...state,
                task_detail: action.payload,
                loading_content: false
            }
        case ADD_TASK:
            return {
                ...state,
                task_detail: action.payload,
                loading_content: false
            }
        case DELETE_TASK:
            return {
                ...state,
                today_tasks: state.today_tasks.filter((task) => task.id !== action.payload),
                alert_tasks: state.alert_tasks.filter((task) => task.id !== action.payload),
                task_by_category: state.task_by_category.filter((task) => task.id !== action.payload)
            }
        case UPDATE_TASK:
            return {
                ...state,
                task_detail: action.payload,
                loading_content: false
            }
        case TODAY_TASKS:
            return {
                ...state,
                today_tasks: action.payload,
            }
        case TASK_BY_CATEGORY:
            return {
                ...state,
                task_by_category: action.payload,
            }
        case GET_ALERTS:
            return {
                ...state,
                alert_tasks: action.payload,
            }
        case LOADING_CONTENT:
            return {
                ...state,
                loading_content: true
            }
        case DONE_TASKS:
            return {
                ...state,
                done_tasks: action.payload
            }
        case MARK_AS_DONE:
            return {
                ...state,
                done_tasks: [
                    ...state.done_tasks,
                    action.payload
                ]
            }
        case MARK_AS_NOT_DONE:
            return {
                ...state,
                done_tasks: [
                    state.done_tasks.filter((task) => task.id !== action.payload)
                ]
            }
        default:
            return state
    }
}
