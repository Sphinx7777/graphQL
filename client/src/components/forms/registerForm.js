import React from 'react';
import s from '../users/users.module.scss';

class RegisterForm extends React.Component {
    defaultState = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    }
    state = {
    ...this.defaultState
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        const { firstName, lastName, email, password } = this.state
        e.preventDefault()
        this.props.onSubmit({
            firstName, lastName, email, password
        })
        this.setState(this.defaultState)
    }
    resetState = () => {
        this.setState(this.defaultState)}

    render() {
        const { firstName, lastName, email, password } = this.state
        const { emailError } = this.props
        const isFormValid = firstName.length > 0 && lastName.length > 0 && email.length > 0
        return (
            <form onSubmit={this.handleSubmit.bind(this)} className={s.formWrapper}>
                <span className={s.inputItem}>Register</span>
                <input
                    className={s.inputItem}
                    placeholder='firstName'
                    name='firstName'
                    value={firstName}
                    onChange={this.handleChange}
                />
                <input
                    className={s.inputItem}
                    placeholder='lastName'
                    name='lastName'
                    value={lastName}
                    onChange={this.handleChange}
                />
                <input
                    className={s.inputItem}
                    placeholder='email'
                    name='email'
                    type='email'
                    value={email}
                    onChange={this.handleChange}
                />
                <input
                    className={s.inputItem}
                    placeholder='Password'
                    name='password'
                    type='password'
                    value={password}
                    onChange={this.handleChange}
                />
                {
                    emailError && <div className={s.alert}>Email: {emailError} is already taken</div>
                }
                
                <div className={s.submitBtn}>
                    <button type='reset' onClick={this.resetState}>Reset</button>
                    <button type='submit' disabled={!isFormValid}>Submit</button>
                </div>
            </form>
        )
    }
}
export default RegisterForm