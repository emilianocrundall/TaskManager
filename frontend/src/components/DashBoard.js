import React, { Component } from 'react'
import Header from '../components/common/Header'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { get_today_tasks } from '../actions/todos'
import Task from './common/Task'
import CurrentTasks from './common/CurrentTasks'
import { Link } from 'react-router-dom'

export class DashBoard extends Component {
    static propTypes = {
        today_tasks: PropTypes.array.isRequired
    }

    componentDidMount(){
        this.props.get_today_tasks()
    }
    render() {
        const { today_tasks } = this.props
        return (
            <div className='second_cont'>
                <Header title={'Home'} />
                {today_tasks.length !== 0 ? (
                    today_tasks.length > 3 ? (
                        <CurrentTasks tasks={today_tasks} />
                    ) : ( <div>
                        {today_tasks.map((task) => (
                        <Task key={task.id} task={task} />
                    ))}
                        <div className='center_button pt-1'>
                            <Link className='add_button' to='/newtask'>Add Task</Link>
                        </div>
                    </div>
                    )
                ) : (
                    <div className='no_content text-center pt-4'>
                        <i className="fas fa-tasks"></i>
                        <h4>You're free! there's no tasks for today</h4>
                        <div className='center_button pt-1'>
                            <Link className='add_button' to='/newtask'>Add Task</Link>
                        </div>
                    </div>
                )}
                
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    today_tasks: state.todos.today_tasks
})

export default connect(mapStateToProps, {get_today_tasks})(DashBoard)
