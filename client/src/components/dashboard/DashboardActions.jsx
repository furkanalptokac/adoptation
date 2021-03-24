import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
    return (
        <div className="dash-buttons">
            <Link to="/edit-profile" className="btn btn-light">
                <i className="fas fa-user-circle text-primary" /> Profili Düzenle
            </Link>

            <Link to="/change-password" className="btn btn-light">
                <i className="fas fa-key text-primary" /> Parola Değiştir
            </Link>
        </div>
    )
}

export default DashboardActions