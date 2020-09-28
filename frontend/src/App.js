import { Provider } from 'react-redux'
import store from './store'
import "@babel/polyfill"
import React, { Component } from 'react'
import { load_user } from './actions/auth'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import './styles/styles.css'
import Register from './pages/Register'
import Login from './pages/Login'
import Menu from './components/Menu'
import DashBoard from './components/DashBoard'
import PrivateRoute from './components/common/PrivateRoute'
import NewTask from './components/NewTask'
import Categories from './components/Categories'
import Category from './components/Category'
import Alerts from './components/Alerts'
import TaskDetail from './components/TaskDetail'

export class App extends Component {

    componentDidMount(){
        store.dispatch(load_user());
    }
    render() {
        return (
            <Provider store={store}>
                <Router>
                <div className='app_container'>
                    <Menu />
                    <Switch>
                        <PrivateRoute exact path='/' component={DashBoard}/>
                        <PrivateRoute exact path='/newtask' component={NewTask} />
                        <PrivateRoute exact path='/categories' component={Categories} />
                        <PrivateRoute exact path='/categories/:id' component={Category} />
                        <PrivateRoute exact path='/tasks/:id' component={TaskDetail} />
                        <PrivateRoute exact path='/alerts' component={Alerts} />
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/register' component={Register}/>
                    </Switch>
                </div>
                </Router>
            </Provider>
        )
    }
}

export default App
