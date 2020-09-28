import React, { Component } from 'react'
import { connect } from 'react-redux'
import { add_category } from '../../actions/todos'

export class AddCategory extends Component {

    state = {
        category: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const cat = {
            name: this.state.category
        }
        this.props.add_category(cat)
        this.setState({
            category: ''
        })
    }

    render() {
        const { category } = this.state
        return (
            <div className='add_cat p-4'>
                <form onSubmit={this.handleSubmit}>
                    <input
                        onChange={this.handleChange}
                        className='custom_input'
                        name='category'
                        value={category}
                        placeholder='Category name'
                    />
                    <div className='text-center'>
                        {category === '' ? (
                            <button className='full_button_d' disabled>Add</button>
                        ) : (
                            <button type='submit' className='full_button'>Add</button>
                        )}
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = {
    add_category
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory)

