import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get_category, get_tasks_by_cat } from '../actions/todos'
import PropTypes from 'prop-types'
import Header from './common/Header'
import Task from './common/Task'
import CurrentTasks from './common/CurrentTasks'

export class Category extends Component {
    static propTypes = {
        category: PropTypes.object.isRequired,
        task_by_category: PropTypes.array.isRequired
    }
    componentDidMount(){
        this.props.get_category(this.props.match.params.id)
        this.props.get_tasks_by_cat(this.props.match.params.id)
    }
    render() {
        const { category, task_by_category } = this.props
        return (
            <div className='second_cont'>
                <Header title={category.name} />
                {task_by_category.length === 0 ? (
                    <div className='no_content text-center p-4'>
                        <i className="fas fa-exclamation-circle"></i>
                        <h4>Oops, seems like there's no tasks for this category</h4>
                    </div>
                ) : (
                    task_by_category.length > 3 ? (
                        <CurrentTasks tasks={task_by_category} />
                    ) : (
                        task_by_category.map((task) => (
                            <Task key={task.id} task={task}/>
                        ))
                    )
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    category: state.todos.category,
    task_by_category: state.todos.task_by_category
})

const mapActionsToProps = {
    get_category,
    get_tasks_by_cat
}

export default connect(mapStateToProps, mapActionsToProps)(Category)
