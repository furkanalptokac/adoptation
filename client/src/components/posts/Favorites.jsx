import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PostItem from './PostItem'
import { getPost, getPosts } from '../../actions/post'

const Favorites = ({ getPosts, getPost, auth: { user }, post: { posts, loading } }) => {
    useEffect(() => {
        getPosts()
    }, [getPosts])
    return (
        <div>
            <h1 className="large text-primary">Takip Edilen İlanlar</h1>
            {posts.map(post => (
                user.followedPosts.some(item => item.post === post._id) && (<PostItem key={post._id} post={post} />)
            ))}
        </div>
    )
}

Favorites.propTypes = {
    getPosts: PropTypes.func.isRequired,
    getPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post
})

export default connect(mapStateToProps, { getPosts, getPost })(Favorites)
