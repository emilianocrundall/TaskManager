import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from './common/Header'
import { Link } from 'react-router-dom'
import { get_task_detail, get_done_tasks, mark_as_done, mark_as_not_done } from '../actions/todos'
import PropTypes from 'prop-types'
import moment from 'moment'
import ModalUpdate from './common/ModalUpdate'
import ModalDelete from './common/ModalDelete'
import LoaderSM from './common/LoaderSM'

export class TaskDetail extends Component {
    state = {
        show_update: false,
        show_delete: false
    }
    static propTypes = {
        task_detail: PropTypes.object.isRequired,
        loading_content: PropTypes.bool.isRequired,
        done_tasks: PropTypes.array.isRequired
    }
    done = (id) => {
        const { done_tasks } = this.props
        if(done_tasks && done_tasks.find((task) => task.id === id)){
            return true
        } else {
            return false
        }
    }
    componentDidMount(){
        this.props.get_done_tasks()
        this.props.get_task_detail(this.props.match.params.id)
    }
    format_date = (date) => {
        const new_date = moment(date).format('MMMM Do YYYY, h:mm')
        return new_date
    }

    render() {
        const { task_detail } = this.props
        if(this.props.loading_content){
            return <LoaderSM />
        } else {
            return (
                <div className='second_cont'>
                    <Header title={'Task details'} />
                    <div className='task_details'>
                        <div className='button_cont'>
                        {this.done(task_detail.id) ? (
                            <button
                                title='Mark as not done'
                                onClick={() => this.props.mark_as_not_done(task_detail.id)}
                                id='done' className='done_button'
                                >
                                <i className="far fa-check-circle"></i>
                            </button>
                        ) : (
                            <button
                                title='Mark as done'
                                onClick={() => this.props.mark_as_done(task_detail.id)}
                                className='done_button'>
                                <i className='fas fa-exclamation-circle'></i>
                            </button>
                        )}
                        </div>
                        <h2>{task_detail.description}</h2>
                        <span>{this.format_date(task_detail.date)}</span>
                        <div>
                        {task_detail.category ? (
                            <Link className='link' to={`/categories/${task_detail.category.id}`}>
                                {task_detail.category.name}
                            </Link>
                        ) : ''}
                        </div>
                        <div className='actions'>
                            <button onClick={() => this.setState({show_update: true})} id='green' className='add_button'>
                                Edit
                            </button>
                            <button onClick={() => this.setState({show_delete: true})} id='pink' className='full_button'>
                                Delete
                            </button>
                        </div>
                    </div>
                    {task_detail.description ? (
                        <React.Fragment>
                            <ModalUpdate show={this.state.show_update} onHide={() => this.setState({show_update: false})} />
                            <ModalDelete
                                task_id={task_detail.id}
                                show={this.state.show_delete}
                                onHide={() => this.setState({show_delete: false})}
                            />
                        </React.Fragment>
                    ) : ''}
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    task_detail: state.todos.task_detail,
    loading_content: state.todos.loading_content,
    done_tasks: state.todos.done_tasks
})

const mapDispatchToProps = {
    get_task_detail,
    get_done_tasks,
    mark_as_done,
    mark_as_not_done
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail)
