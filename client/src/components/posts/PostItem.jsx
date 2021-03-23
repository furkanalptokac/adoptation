import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addLike, removeLike, deletePost, followPost } from '../../actions/post'
import formatDate from '../../actions/formatDate'

const PostItem = ({
    addLike,
    removeLike,
    deletePost,
    followPost,
    auth,
    post: {_id, title, text, name, avatar, user, likes, comments, date, category},
    showActions,
}) => {
    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${user}`}>
                    <img className="round-img" src={avatar} alt="" />
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <h2>{title}</h2>
                <p className="my-1">
                    {text}
                </p>
                <small>Tür: {category}</small>
                <p className="post-date">{formatDate(date)} tarihinde paylaşıldı.</p>

                {showActions && <Fragment>
                    <button onClick={e => addLike(_id)} type="button" className="btn btn-light">
                        <i className="fas fa-thumbs-up" />
                        <span> {likes.length > 0 && <span>{likes.length}</span>}</span>
                    </button>
                    <button onClick={e => removeLike(_id)} type="button" className="btn btn-light">
                        <i className="fas fa-thumbs-down" />
                    </button>
                    <Link to={`/posts/${_id}`} className="btn btn-primary">
                        Detaylar{' '} {comments.length > 0 && (
                            <span className="comment-count">{comments.length}</span>
                        )}
                    </Link>
                    {!auth.loading && user === auth.user._id && (
                        <button onClick={e => deletePost(_id)} type="button" className="btn btn-danger">
                            <i className="fas fa-times"/>
                        </button>
                    )}
                    <button onClick={e => {followPost(_id, auth.user._id)}} type="submit" className="btn btn-success">
                            <i className="fas fa-heart"/>
                    </button>
                </Fragment>}
            </div>
        </div>
    )
}

PostItem.defaultProps = {
    showActions: true
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    followPost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {addLike, removeLike, deletePost, followPost})(PostItem)