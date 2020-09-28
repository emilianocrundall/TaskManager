import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { update_task, get_categories} from '../../actions/todos'
import { Modal } from 'react-bootstrap'
import moment from 'moment'

export class ModalUpdate extends Component {

    state = {
        description: this.props.task_detail.description,
        date: this.props.task_detail.date,
        category: this.props.task_detail.category.id,
        changed: false
    }
    static propTypes = {
        task_detail: PropTypes.object.isRequired,
        categories: PropTypes.array.isRequired
    }
    componentDidMount(){
        this.props.get_categories()
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            changed: true
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { task_detail } = this.props
        const { description, category, date } = this.state
        const body = {
            description: description,
            category: category,
            date: date
        }
        this.props.update_task(task_detail.id, body)
    }

    render() {
        const { categories } = this.props
        const { description, category, date, changed } = this.state
        const valid_form = description && category && date !== '' && changed ? (
            <button type='submit' className='full_button'  onClick={this.props.onHide}>Update</button>
        ) : (
            <button className='full_button_d' disabled>Update</button>
        )
        const new_date = moment(date).format('YYYY-MM-DDTHH:mm');
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                dialogClassName='custom_modal'
                backdrop="static"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update Task
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.handleSubmit}>
                        <div className="md-form mb-3">
                            <input
                                onChange={this.handleChange}
                                className='custom_input'
                                name='description'
                                value={description}
                                placeholder='Description'
                            />
                        </div>
                        <div className="md-form mb-3">
                            <input
                                className='custom_input'
                                type='datetime-local'
                                name='date'
                                value={new_date}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="md-form mb-3">
                            <select
                                className='custom_input'
                                value={category}
                                name='category'
                                placeholder='Category'
                                onChange={this.handleChange}
                            >
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='text-center'>
                            {valid_form}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className='full_button_alt' onClick={this.props.onHide} >Close</button>
                </Modal.Footer>
            </Modal>
        )
    }
}
const mapStateToProps = (state) => ({
    categories: state.todos.categories,
    task_detail: state.todos.task_detail
})

const mapActionsToProps = {
    update_task,
    get_categories
}

export default connect(mapStateToProps, mapActionsToProps)(ModalUpdate)
