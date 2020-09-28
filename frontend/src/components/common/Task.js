import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

export class Task extends Component {

    format_date = (date) => {
        const new_date = moment(date).format('MMMM Do YYYY, h:mm')
        return new_date
    }
    render() {
        const { task } = this.props
        return (
            <Link to={`/tasks/${task.id}`} className='task'>
                <div id='first'>
                    <h5>{task.description}</h5>
                    <p>{this.format_date(task.date)}</p>
                    {task.category ? (
                        <span>{task.category.name}</span>
                    ) : ''}
                </div>
                <div id='second'>
                    {task.done ? (
                        <i className="far fa-check-circle"></i>
                    ) : <i className="fas fa-exclamation-circle"></i>
                    }
                </div>
            </Link>
        )
    }
}

export default Task
