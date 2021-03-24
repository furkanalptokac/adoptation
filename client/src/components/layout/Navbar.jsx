import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { user, isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <ul>
            {loading || user === null ? '': isAuthenticated && user.admin === true &&
                <li>
                    <Link to="/admin">
                        <i className="fas fa-user-shield" />{' '}
                        <span className="hide-sm">Admin</span>
                    </Link>
                </li>
            }
            <li>
                <Link to="/posts">
                    <i className="fas fa-cat" />{' '}
                    <span className="hide-sm">İlanlar</span>
                </Link>
            </li>
            <li>
                <Link to="/favorites">
                    <i className="fas fa-heart" />{' '}
                    <span className="hide-sm">Favoriler</span>
                </Link>
            </li>
            <li>
                <Link to="/profiles">
                <i className="fas fa-user-friends" />{' '}
                    <span className="hide-sm">Profiller</span>
                </Link>
            </li>
            <li>
                <Link to="/dashboard">
                    <i className="fas fa-user" />{' '}
                    <span className="hide-sm">Hesap</span>
                </Link>
            </li>
            <li>
                <a onClick={logout} href='#!'>
                    <i className="fas fa-sign-out-alt" />{' '}
                    <span className="hide-sm">Çıkış Yap</span>
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <Link to="/register">Kayıt Ol</Link>
            </li>
            <li>
                <Link to="/login">Giriş Yap</Link>
            </li>
        </ul>
    );

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i className="fas fa-paw"/> Sahiplenn
                </Link>
            </h1>
            { !loading && (<Fragment>
                { isAuthenticated ? authLinks : guestLinks }
            </Fragment>) }
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);