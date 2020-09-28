import React from 'react'

const Pagination = ({tasks_per_page, total_tasks, paginate}) => {
    const page_numbers = []

    for(let i = 1; i <= Math.ceil(total_tasks / tasks_per_page); i++){
        page_numbers.push(i)
    }

    return (
        <nav className='custom_navigate'>
            <ul>
                {page_numbers.map((number) => (
                    <li key={number}>
                        <button
                            className='paginate_button'
                            onClick={() => paginate(number)}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination