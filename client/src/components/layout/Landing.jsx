import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">Adoptation</h1>
                    <p className="lead">
                        Sahiplendireceğiniz canlılarınız yuvasız kalmasın.
                    </p>
                    <div className="buttons">
                        <Link to="/register" className="btn btn-primary">Kayıt Ol</Link>
                        <Link to="/login" className="btn btn-light">Giriş Yap</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);