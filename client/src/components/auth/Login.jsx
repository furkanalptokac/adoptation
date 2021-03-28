import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        login({ email, password });
    };

    if (isAuthenticated) {
        return <Redirect to="/" />
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Giriş Yap</h1>
            <p className="lead">
                <i className="fas fa-user"/> Hesabına Giriş Yap
            </p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Parola"
                        name="password"
                        value={password}
                        onChange={onChange}
                        minLength="6"
                        required
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Giriş Yap" />
            </form>
            <p className="my-1">
                Parolanızı mı unuttunuz?
                <Link to="/forgot-password"> Parola sıfırla</Link>
            </p>
            <p className="my-1">
                Hesabınız yok mu?
                <Link to="/register"> Kayıt Ol</Link>
            </p>
        </Fragment>
    )
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);