import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { postReport } from '../../actions/report'

const Report = ({ postReport }) => {
    const [report, setReport] = useState('')

    return (
        <Fragment>
            <form className="form" onSubmit={e => {
                e.preventDefault()
                postReport(report)
                setReport('')
            }}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Şikayetiniz"
                        name="id"
                        value={report}
                        onChange={e => setReport(e.target.value)}
                        required
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Şikayet Bildir" />
            </form>
        </Fragment>
    )
}

Report.propTypes = {
    postReport: PropTypes.func.isRequired
}

export default connect(null, { postReport })(Report)
