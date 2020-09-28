import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../actions/auth'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export class Menu extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired
    }
    render() {
        const { location } = this.props
        const { user, loading, isAuthenticated } = this.props.auth

        if(location.pathname.match(/login/) || location.pathname.match(/register/)){
            return null
        } else if(loading){
            return null
        } else {
            return (
                <div className='menu'>
                    <div className='text-center pt-3'>
                    {isAuthenticated ? (
                        <h5 style={{color: 'white'}}>Welcome back, {user.username}</h5>
                    ) : ''}
                    </div>
                    <nav>
                        <ul>
                            <li>
                                <Link className='menu_link' to='/'>
                                    <i className='fas fa-home'></i>
                                    <span> HOME</span>
                                </Link>
                            </li>
                            <li>
                                <Link className='menu_link' to='/newtask'>
                                    <i className='fas fa-plus'></i>
                                    <span> ADD TASK</span>
                                </Link>
                            </li>
                            <li>
                                <Link className='menu_link' to='/alerts'>
                                    <i className='fas fa-bell'></i>
                                    <span> ALERTS</span>
                                </Link>
                            </li>
                            <li>
                                <Link className='menu_link' to='/categories'>
                                    <i className='fas fa-list'></i>
                                    <span> CATEGORIES</span>
                                </Link>
                            </li>
                            <li id='logout_li'>
                            {isAuthenticated ? (
                                <button onClick={this.props.logout} className='menu_link'>
                                    <i className="fas fa-sign-out-alt"></i>
                                </button>
                            ) : ''}
                            </li>
                        </ul>
                    </nav>
                    <div className='menu_logout'>
                        {isAuthenticated ? (
                            <button onClick={this.props.logout} className='full_button'>
                                <span> Logout</span>
                            </button>
                        ) : ''}
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = {
    logout
}

const MenuWithRouter = withRouter(Menu)

export default connect(mapStateToProps, mapDispatchToProps)(MenuWithRouter)
