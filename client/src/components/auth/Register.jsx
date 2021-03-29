import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        password2: '',
    });

    const { name, surname, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Parolalar eşleşmiyor.', 'danger');
        } else {
            register({ name, surname, email, password });
        }
    }

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Kayıt Ol</h1>
            <p className="lead">
                <i className="fas fa-user"/> Hesap Oluştur
            </p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Ad"
                        name="name"
                        value={name}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Soyad"
                        name="surname"
                        value={surname}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                    <small className="form-text">
                        Bu site Gravatar kullanıyor, profil fotoğrafınız olsun isterseniz
                        Gravatar emailiniz ile giriş yapın.
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Parola"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        minLength="6"
                        required
                    />
                    <small className="form-text">
                        En az 6 karakter, büyük harf, küçük harf ve rakam zorunludur.
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Parolanızı Onaylayın"
                        name="password2"
                        value={password2}
                        onChange={e => onChange(e)}
                        minLength="6"
                        required
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Kayıt Ol" />
            </form>
            <p className="my-1">
                Hesabınız var mı? 
                <Link to="/login"> Giriş Yap</Link>
            </p>
        </Fragment>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);