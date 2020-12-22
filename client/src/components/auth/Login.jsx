import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        password2: '',
        city: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        console.log('Success.');
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
                        onChange={e => onChange(e)}
                        required
                    />
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
                </div>
                <input type="submit" className="btn btn-primary" value="Giriş Yap" />
            </form>
            <p className="my-1">
                Hesabınız yok mu? 
                <Link to="/register">Kayıt Ol</Link>
            </p>
        </Fragment>
    )
}

export default Login