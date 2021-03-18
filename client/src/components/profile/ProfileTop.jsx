import React from 'react'
import PropTypes from 'prop-types'

const ProfileTop = ({
    profile: {
        location,
        social,
        bio,
        user: { name, avatar }
    }
}) => {
    return (
        <div className="profile-top bg-primary p-2">
            <img className="round-img my-1" src={avatar} alt=""/>
            <h1 className="large">{name}</h1>
            <p className="lead">
                {bio && <span>{bio}</span>}
            </p>
            <p>{location && <span>{location}</span>}</p>

            <div className="icons my-1">
                {social && social.facebook && (
                    <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook"></i>
                    </a>
                )}
                {social && social.twitter && (
                    <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter"></i>
                    </a>
                )}
                {social && social.instagram && (
                    <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram"></i>
                    </a>
                )}
            </div>
        </div>
    )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileTop
