import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Header from './common/Header'
import Task from './common/Task'
import CurrentTasks from './common/CurrentTasks'
import { get_alerts } from '../actions/todos'

export class Alerts extends Component {

    static propTypes = {
        alert_tasks: PropTypes.array.isRequired
    }

    componentWillMount(){
        this.props.get_alerts()
    }
    render() {
        const { alert_tasks } = this.props
        return (
            <div className='second_cont'>
                <Header title={'alerts'}/>
                {alert_tasks.length !== 0 ? (
                    alert_tasks.length > 3 ? (
                        <CurrentTasks tasks={alert_tasks} />
                    ) : alert_tasks.map((task) => (
                        <Task key={task.id} task={task} />
                    ))
                ) : (
                    <div className='no_content text-center pt-4'>
                        <i className="far fa-check-circle"></i>
                        <h4>There's not alerts, get a coffee</h4>
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    alert_tasks: state.todos.alert_tasks
})


export default connect(mapStateToProps, { get_alerts })(Alerts)
