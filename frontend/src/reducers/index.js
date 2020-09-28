import { combineReducers } from 'redux'
import todos from './todos'
import auth from './auth'

export default combineReducers({
    auth: auth,
    todos: todos
})