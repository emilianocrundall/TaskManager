import React, { Component } from 'react'
import { connect } from 'react-redux'
import { delete_task } from '../../actions/todos'
import { Modal } from 'react-bootstrap'
import { withRouter } from 'react-router'

export class ModalDelete extends Component {

    handleDelete = () => {
        this.props.delete_task(this.props.task_id)
        this.props.history.push('/')
    }
    render() {
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
                    <div>
                        <div className='text-center'>
                            <h4 className='text-light p-4'>Dou you really want to delete this task?</h4>
                        </div>
                        <div className='button_container p-2'>
                            <button className='full_button_alt' onClick={this.props.onHide}>
                                Cancel
                            </button>
                            <button onClick={this.handleDelete} className='full_button'>
                                Delete
                            </button>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='full_button_alt' onClick={this.props.onHide} >Close</button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapDispatchToProps = {
    delete_task
}
const ModalDeleteWithRouter = withRouter(ModalDelete)

export default connect(null, mapDispatchToProps)(ModalDeleteWithRouter)
