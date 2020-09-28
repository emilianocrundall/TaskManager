import React, { Component } from 'react'
import Header from '../components/common/Header'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { get_categories, add_task } from '../actions/todos'
import { withRouter } from 'react-router'

export class NewTask extends Component {
    state = {
        description: '',
        date: '',
        category: '1'
    }
    static propTypes = {
        categories: PropTypes.array.isRequired,
        task_detail: PropTypes.object.isRequired
    }
    componentDidMount(){
        this.props.get_categories()
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const body = {
            description: this.state.description,
            date: this.state.date,
            category: this.state.category
        }
        this.props.add_task(body)
        if(this.props.task_detail){
            this.props.history.push(`/tasks/${this.props.task_detail.id}`)
        }
    }
    render() {
        const { description, date, category } = this.state
        const { categories } = this.props
        const valid_form = description !== '' ? (
            <button className='full_button' type='submit'>Add task</button>
        ) : (
            <button className='full_button_d' disabled>Add task</button>
        )
        return (
            <div className='second_cont'>
                <Header title={'New task'} />
                <form className='new_task_form' onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <input
                            type='text'
                            name='description'
                            value={description}
                            placeholder='Description'
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='datetime-local'
                            name='date'
                            value={date}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className='form-group'>
                        <select
                            value={category}
                            name='category'
                            placeholder='Category'
                            onChange={this.handleChange}
                        >
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='form-group text-center'>
                        {valid_form}
                    </div>
                </form>
                <p className='text-light p-3'>** If the category that you want asign to the new task doesn't appear, add a new one
                    <Link to='/categories' className='link'> here</Link>
                </p>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    categories: state.todos.categories,
    task_detail: state.todos.task_detail
})
const mapActionsToProps = {
    get_categories,
    add_task
}

const NewTaskWithRouter = withRouter(NewTask)

export default connect(mapStateToProps, mapActionsToProps)(NewTaskWithRouter)
