import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

export class Header extends Component {
    render() {
        const { title } = this.props
        return (
            <div className='header'>
                {title !== 'Home' ? (
                    <button onClick={this.props.history.goBack}>
                        <i className='fas fa-arrow-left'></i>
                    </button>
                ) : null}
                <h4>{title}</h4>
            </div>
        )
    }
}

export default withRouter(Header)
