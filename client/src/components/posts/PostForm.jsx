import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addPost } from '../../actions/post'

const PostForm = ({ addPost }) => {
    const [postData, setPostData] = useState({
        name: '',
        text: ''
    });

    const { name, text } = postData

    const onChange = e => setPostData({ ...postData, [e.target.name]: e.target.value})
    
    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>İlan paylaşın.</h3>
            </div>
            <form className="form my-1" onSubmit={e => {
                e.preventDefault()
                addPost({ text, name })
            }}>
                <textarea
                    name="name"
                    placeholder="İlan başlığı"
                    value={name}
                    onChange={e => onChange(e)}
                    required
                ></textarea>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="İlan içeriği"
                    value={text}
                    onChange={e => onChange(e)}
                    required
                ></textarea>
                <input type="submit" class="btn btn-dark my-1" value="Oluştur" />
            </form>
        </div>
    )
}


PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
}


export default connect(null, { addPost })(PostForm)
