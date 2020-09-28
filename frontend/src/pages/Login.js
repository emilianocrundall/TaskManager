import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../actions/auth'
import PropTypes from 'prop-types'

export class Login extends Component {

    state = {
        username: '',
        password: '',
        fail: false
    }
    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    componentDidUpdate(prevProps){
        const { error } = this.props.auth
        if(error && error !== prevProps.error){
            if(error.non_field_errors){
                this.setState({
                    fail: error.non_field_errors
                })
            }
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { username, password } = this.state
        this.props.login(username, password)

    }
    render() {
        const { auth } = this.props
        const { username, password, fail } = this.state
        const valid_form = username && password !== '' ? (
            <button type='submit' className='full_button'>Login</button>
        ) : (
            <button className='full_button_d' disabled>Login</button>
        )
        if(auth.isAuthenticated){
            return <Redirect to='/'/>
        } else {
            return (
                <div className='auth_form'>
                    <h3 className='title'>Login</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div className='form-group'>
                            <input
                                type='text'
                                name='username'
                                value={username}
                                onChange={this.handleChange}
                                placeholder='Username'
                                className='custom_input'
                            />
                        </div>
                        <div className='form-group'>
                            <input
                                type='password'
                                name='password'
                                value={password}
                                onChange={this.handleChange}
                                placeholder='Password'
                                className='custom_input'
                            />
                        </div>
                        <div className='form-group'>
                            {valid_form}
                        </div>
                    </form>
                    {fail ? (
                        <div className='display_error text-center'>
                            {fail}
                        </div>
                    ) : ''}
                    <p>Don't have an account? <Link className='link' to='/register'>Click here!</Link></p>
                </div>
            )
        }
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    error: state.auth.error
})

export default connect(mapStateToProps, { login })(Login)
