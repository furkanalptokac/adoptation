import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

const CreateProfile = ({ createProfile, history }) => {
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

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history);
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Profil Oluştur
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Kendinle ilgili bilgi ver
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
                    <i className="fab fa-facebook fa-2x"></i>
                    <input
                        type="text"
                        placeholder="Facebook URL"
                        name="facebook"
                        value={facebook}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group social-input">
                    <i className="fab fa-twitter fa-2x"></i>
                    <input
                        type="text"
                        placeholder="Twitter URL"
                        name="twitter"
                        value={twitter}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group social-input">
                    <i className="fab fa-instagram fa-2x"></i>
                    <input
                        type="text"
                        placeholder="Instagram URL"
                        name="instagram"
                        value={instagram}
                        onChange={e => onChange(e)}
                    />
                </div>
                <button type="submit" className="btn btn-primary my-1">Oluştur</button>
                <a className="btn btn-light my-1" href="dashboard.html">Geri git</a>
            </form>
        </Fragment>
    )
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
}

export default connect(null, { createProfile })(withRouter(CreateProfile));