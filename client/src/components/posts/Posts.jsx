import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'
import PostForm from './PostForm'
import { getPosts } from '../../actions/post'

const Posts = ({ getPosts, post: { posts, loading } }) => {
    const [category, setCategory] = useState('Hepsi')
    useEffect(() => {
        getPosts()
    }, [getPosts])

    return loading ? <Spinner /> : <Fragment>
        <PostForm />

        <h1 className="large text-primary">İlanlar</h1>
        
        <form onSubmit = {e => {
            e.preventDefault()
        }}>
            <select
                name="category"
                value={category}
                onChange={e => setCategory(e.target.value)}
            >
                <option value="Hepsi">Hepsi</option>
                <option value="Kedi">Kedi</option>
                <option value="Köpek">Köpek</option>
                <option value="Balık">Balık</option>
                <option value="Kuş">Kuş</option>
                <option value="Diğer">Diğer</option>
            </select>

        </form>
    
        <div className="posts">
            {posts.map(post => (
                category === "Hepsi" ? (
                    <PostItem key={post._id} post={post} />
                ) : (
                    post.category === category && <PostItem key={post._id} post={post} />
                )
            ))}
        </div>
    </Fragment>
}


Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPosts })(Posts)
