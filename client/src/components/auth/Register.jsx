import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        password2: '',
        city: ''
    });

    const { name, surname, email, password, password2, city } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            console.log('Passwords do not match');
        } else {
            const newUser = {
                name,
                surname,
                email,
                password,
                password2,
                city
            };

            try {
                const config = {
                    headers: {
                        'Content-Type': 'Application/json'
                    }
                };

                const body = JSON.stringify(newUser);
                const res = await axios.post('http://localhost:5000/api/users/signup', body, config);
                console.log(res.data);
            } catch (err) {
                console.error(err.response.data);
            }
        }
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
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Yaşadığınız Şehir"
                        name="city"
                        value={city}
                        onChange={e => onChange(e)}
                        minLength="6"
                        required
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Kayıt Ol" />
            </form>
            <p className="my-1">
                Hesabınız var mı? 
                <Link to="/login">Giriş Yap</Link>
            </p>
        </Fragment>
    )
}

export default Register