import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i className="fas"/> Sahiplenn
                </Link>
            </h1>
            <ul>
                <li>
                    <Link to="/register">Kayıt Ol</Link>
                </li>
                <li>
                    <a href="/login">Giriş Yap</a>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar