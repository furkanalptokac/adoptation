import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';

const Dashboard = ({ getCurrentProfile, deleteAccount, auth: { user }, profile: { profile, loading } }) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);
    return loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">
            Hesap
        </h1>
        <p className="lead">
            <i className="fas fa-user"> Hoşgeldin {user && user.name}</i>
        </p>
        {profile !== null ? (
            <Fragment>
                <DashboardActions />

                <div className="my-2">
                    <button className="btn btn-danger" onClick={() => deleteAccount()}>
                        <i className="fas fa-user"></i> Hesabımı Sil
                    </button>
                </div>
            </Fragment>
        ) : (
            <Fragment>
                <p>Profilinizi hala oluşturmadınız. Lütfen bilgilerinizi ekleyin.</p>
                <Link to="/create-profile" className="btn btn-primary my-1">Profil Oluştur</Link>
            </Fragment>
        )}
    </Fragment>;
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
