import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { banUser } from '../../actions/profile'
const Admin = ({ banUser }) => {
    const [id, setId] = useState('')

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
        </Fragment>
    )
}

Admin.propTypes = {
    banUser: PropTypes.func.isRequired
}

export default connect(null, { banUser })(Admin)
