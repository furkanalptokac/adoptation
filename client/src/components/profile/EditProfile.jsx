import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({ profile: { profile, loading }, createProfile, getCurrentProfile, history }) => {
    const [formData, setFormData] = useState({
        location: '',
        status: '',
        bio: '',
        twitter: '',
        facebook: '',
        instagram: '',
    });

    const {
        location,
        bio,
        twitter,
        facebook,
        instagram
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    useEffect(() => {
        getCurrentProfile();

        setFormData({
            location: loading || !profile.location ? '' : profile.location,
            status: loading || !profile.status ? '' : profile.status,
            bio: loading || !profile.bio ? '' : profile.bio,
            twitter: loading || !profile.social ? '' : profile.social.twitter,
            facebook: loading || !profile.social ? '' : profile.social.facebook,
            instagram: loading || !profile.social ? '' : profile.social.instagram,
        });
    }, [loading, getCurrentProfile, profile.bio, profile.location, profile.social, profile.status]);

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history, true);
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Profil Oluştur
            </h1>
            <p className="lead">
                <i className="fas fa-user" /> Kendinle ilgili bilgi ver
            </p>
            <small>* zorunlu alanlar</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Yaşadığınız şehir*"
                        name="location"
                        //required="true"
                        value={location}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <textarea
                        placeholder="Bize kendinden bahset*"
                        name="bio"
                        //required="true"
                        value={bio}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group social-input">
                    <i className="fab fa-facebook fa-2x" />
                    <input
                        type="text"
                        placeholder="Facebook URL"
                        name="facebook"
                        value={facebook}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group social-input">
                    <i className="fab fa-twitter fa-2x" />
                    <input
                        type="text"
                        placeholder="Twitter URL"
                        name="twitter"
                        value={twitter}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group social-input">
                    <i className="fab fa-instagram fa-2x" />
                    <input
                        type="text"
                        placeholder="Instagram URL"
                        name="instagram"
                        value={instagram}
                        onChange={e => onChange(e)}
                    />
                </div>
                <button type="submit" className="btn btn-primary my-1">Oluştur</button>
                <Link className="btn btn-light my-1" to="/dashboard">Geri git</Link>
            </form>
        </Fragment>
    )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));