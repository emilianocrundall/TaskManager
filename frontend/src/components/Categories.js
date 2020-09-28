import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { get_categories } from '../actions/todos'
import Header from './common/Header'
import { Link } from 'react-router-dom'
import AddCategory from './common/AddCategory'

export class Categories extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        categories: PropTypes.array.isRequired
    }
    componentDidMount(){
        this.props.get_categories()
    }

    render() {
        const { categories } = this.props
        return (
            <div className='second_cont'>
                <Header title={'Categories'} />
                <AddCategory />
                {categories.length !== 0 ? (
                    <div className='sm_cont'>
                        {categories.map((cat) => (
                            <Link className='cat_link' to={`/categories/${cat.id}`} key={cat.id}>
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                ): <div className='no_content text-center pt-4'>
                    <i className="fas fa-exclamation-circle"></i>
                    <h4>Oops, seems like there's not categories yet!</h4>
                </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    categories: state.todos.categories
})

const mapActionsToProps = {
    get_categories
}

export default connect(mapStateToProps, mapActionsToProps)(Categories)
