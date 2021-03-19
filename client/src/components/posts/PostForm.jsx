import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { addPost } from '../../actions/post'

const PostForm = ({ addPost }) => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [category, setCategory] = useState('')
    
    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>İlan paylaşın.</h3>
            </div>
            <form className="form my-1" onSubmit={e => {
                e.preventDefault()
                addPost({ text, title, category })
                setTitle('')
                setText('')
                setCategory('')
            }}>
                <select 
                    name="category"
                    required
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                >
                    <option value="" disabled>Tür</option>
                    <option value="Kedi">Kedi</option>
                    <option value="Köpek">Köpek</option>
                    <option value="Balık">Balık</option>
                    <option value="Kuş">Kuş</option>
                    <option value="Diğer">Diğer</option>
                </select>
                <textarea
                    name="title"
                    placeholder="İlan başlığı"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                ></textarea>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="İlan içeriği"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    required
                />
                <input type="submit" className="btn btn-dark my-1" value="Oluştur" />
            </form>
        </div>
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
}


export default connect(null, { addPost })(PostForm)
