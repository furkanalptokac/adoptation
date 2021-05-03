import React from 'react'
import PropTypes from 'prop-types'

const ReportItem = ({ report: { _id, name, surname, report }}) => {
    return (
        <div className="post bg-white p-1 my-1">
            <h2>{name} {surname}</h2>
                <p className="my-1">
                    {report}
                </p>
                <small>User_id: {_id}</small>
        </div>
    )
}

ReportItem.propTypes = {
    report: PropTypes.object.isRequired,
}

export default ReportItem
