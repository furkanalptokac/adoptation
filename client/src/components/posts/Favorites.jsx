import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PostItem from './PostItem'
import Spinner from '../layout/Spinner'
import { getPost, getPosts } from '../../actions/post'

/*
user.followedPosts.some(item => console.log(item.post) &&
                item.post === post._id) &&
                <PostItem key={post._id} post={post} />


                {posts.map(post =>
                    user.favorites.some(item => console.log(item._id))
                    )}

                    user.favorites.some(item => console.log(item._id))
*/

const Favorites = ({ getPosts, getPost, auth: { user }, post: { posts, loading } }) => {
    useEffect(() => {
        getPosts()
    }, [getPosts])

    return ( loading ? <Spinner /> : <Fragment>
            <h1 className="large text-primary">Takip Edilen İlanlar</h1>

            <div className="posts">
                {loading || user === null ? <Spinner /> :
                posts.map(post =>
                    user.favorites.some(item =>
                        item._id === post._id &&
                        console.log(post._id) &&
                        <PostItem key={post._id} post={post} />
                    )
                )}
            </div>
        </Fragment>
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
