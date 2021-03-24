import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { changePassword } from '../../actions/profile'

const ChangePassword = ({ auth: { user }, changePassword }) => {
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const _id = user._id
    return (
        <Fragment>
            <h1 className="large text-primary">Parola Değiştir</h1>
            <form className="form" onSubmit={e => {
                e.preventDefault();
                (password1 === password2 ?(
                    changePassword({ _id, password1})
                    ) : ( 
                    console.log('Parolalar eşleşmiyor.')
                ))
                setPassword1('')
                setPassword2('')
            }}>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Parola"
                        value={password1}
                        onChange={e => setPassword1(e.target.value)}
                        name="password1"
                        minLength="6"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Parola Tekrar"
                        value={password2}
                        onChange={e => setPassword2(e.target.value)}
                        name="password2"
                        minLength="6"
                        required
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Güncelle" />
            </form>
        </Fragment>
    )
}

ChangePassword.propTypes = {
    changePassword: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {changePassword})(ChangePassword)
