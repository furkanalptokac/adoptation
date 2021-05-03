import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { banUser } from '../../actions/profile'
import { getReports } from '../../actions/report'
import ReportItem from '../report/ReportItem'

const Admin = ({ getReports, report: { reports, loading }, banUser }) => {
    const [id, setId] = useState('')
    useEffect(() => {
        getReports();
    }, [getReports]);
    
    return (
        <Fragment>
            <form className="form" onSubmit={e => {
                e.preventDefault()
                banUser(id)
                setId('')
            }}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="id"
                        name="id"
                        value={id}
                        onChange={e => setId(e.target.value)}
                        required
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Banla" />
            </form>

            <div className="posts">
                {reports.map(report => (
                    <ReportItem key={report._id} report={report} />
                ))}
            </div>
        </Fragment>
    )
}

Admin.propTypes = {
    banUser: PropTypes.func.isRequired,
    getReports: PropTypes.func.isRequired,
    report: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    report: state.report
})

export default connect(mapStateToProps, { banUser, getReports })(Admin)
