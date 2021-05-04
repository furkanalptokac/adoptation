import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'
import PostForm from './PostForm'
import { getPosts } from '../../actions/post'

var userLat, userLong

const distance = (posts) => {
    var arr = []
    var distanceArr = []

    posts.forEach(post => {
        var info = {
            id: post._id,
            lat: post.latitude,
            long: post.longitude
        }
        arr.push(info)
    })

    arr.forEach(item => {
        let dist = Math.sqrt(Math.pow((Math.abs(userLat - item.lat)), 2) + Math.pow((Math.abs(userLong - item.long)), 2))

        var info = {
            id: item.id,
            dist: dist
        }

        distanceArr.push(info)
    })

    distanceArr.sort((a, b) => {
        return a.dist - b.dist
    })

    return distanceArr
}

const Posts = ({ getPosts, post: { posts, loading } }) => {
    const [category, setCategory] = useState('Hepsi')
    useEffect(() => {
        getPosts()
        
        navigator.geolocation.getCurrentPosition((position) => {
            userLat = position.coords.latitude
            userLong = position.coords.longitude
        })
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
                <option value="Yakin">Konuma Göre En Yakın</option>
                <option value="Hepsi">Hepsi</option>
                <option value="Kedi">Kedi</option>
                <option value="Köpek">Köpek</option>
                <option value="Balık">Balık</option>
                <option value="Kuş">Kuş</option>
                <option value="Diğer">Diğer</option>
            </select>
        </form>
    
        <div className="posts">
            {category === 'Yakin' ? (
                distance(posts).map(item => (
                    posts.map(post => (
                        post._id === item.id && <PostItem key={post._id} post={post} />
                    ))
                ))) : 
                posts.map(post => (
                    category === "Hepsi" ? (
                        <PostItem key={post._id} post={post} />
                    ) : (
                        post.category === category && <PostItem key={post._id} post={post} />
                    )
                ))
            }
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
