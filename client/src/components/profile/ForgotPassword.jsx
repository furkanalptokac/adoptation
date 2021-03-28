import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { forgotPassword } from '../../actions/profile'

const ForgotPassword = ({ forgotPassword }) => {
    const [email, setEmail] = useState('');
    return (
        <Fragment>
            <h1 className="large text-primary">Parola Sıfırla</h1>
            <form className="form" onSubmit={e => {
                e.preventDefault()
                forgotPassword({ email })
                setEmail('')
            }}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Sıfırla" />
            </form>
        </Fragment>
    )
}

ForgotPassword.propTypes = {
    forgotPassword: PropTypes.func.isRequired,
}

export default connect(null, { forgotPassword })(ForgotPassword)
