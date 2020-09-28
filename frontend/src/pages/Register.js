import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { register_user } from '../actions/auth'
import { connect } from 'react-redux'

export class Register extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired
    }
    state = {
        username: '',
        email: '',
        password: '',
        confirmpass: '',
        fail: false
    }
    componentDidUpdate(prevProps){
        const { error } = this.props.auth
        if(error && error !== prevProps.error){
            if(error.username){
                this.setState({
                    fail: error.username
                })
            }else if(error.email){
                this.setState({
                    fail: error.email
                })
            }
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { username, email, password, confirmpass } = this.state
        if(password.length < 6){
            this.setState({
                fail: "The password is too short!"
            })
        } else if(password !== confirmpass){
            this.setState({
                fail: "The passwords do not match"
            })
        } else {
            const user = { username, email, password }
            this.props.register_user(user)
        }
        
    }
    render() {
        const { username, email, password, confirmpass, fail } = this.state
        const valid_form = username && email && password && confirmpass !== '' ? (
            <button type='submit' className='full_button'>Register</button>
        ) : (
            <button className='full_button_d' disabled>Register</button>
        )
        if(this.props.auth.isAuthenticated){
            return <Redirect to='/' />
        } else{
            return (
                <div className='auth_form'>
                    <h3 className='title'>Register</h3>
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
                                type='text'
                                name='email'
                                value={email}
                                onChange={this.handleChange}
                                placeholder='Email'
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
                            <input
                                type='password'
                                name='confirmpass'
                                value={confirmpass}
                                onChange={this.handleChange}
                                placeholder='Confirm password'
                                className='custom_input'
                            />
                        </div>
                        <div className='form-group'>
                            {valid_form}
                        </div>
                    </form>
                    {fail ? (
                        <div className='display_error text-center'>
                            <span>{fail}</span>
                        </div>
                    ) : ''}
                    <p>Already an account? <Link className='link' to='/login'>Click here!</Link></p>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) =>({
    auth: state.auth,
    error: state.auth.error
})

export default connect(mapStateToProps, {register_user})(Register)
