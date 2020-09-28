import React, {useState} from 'react'
import Pagination from './Pagination'
import Task from './Task'

const CurrentTasks = ({tasks}) => {
    const [ current_page, set_current_page ] = useState(1)
    const [ tasks_per_page ] = useState(3)

    const index_last_task = current_page * tasks_per_page
    const index_first_task = index_last_task - tasks_per_page
    const current_tasks = tasks.slice(index_first_task, index_last_task)

    const paginate = (page_number) => set_current_page(page_number)
    return (
        <React.Fragment>
            {current_tasks.map((task) => (
                <Task key={task.id} task={task} />
            ))}
            <Pagination
                paginate={paginate}
                tasks_per_page={tasks_per_page}
                total_tasks={tasks.length}
            />
        </React.Fragment>
    )
}

export default CurrentTasks