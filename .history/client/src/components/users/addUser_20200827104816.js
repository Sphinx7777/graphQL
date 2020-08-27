import React from 'react';
import s from './users.module.scss';

class AddUser extends React.Component {
    state = {
        ...this.props.defaultState
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        const { firstName, lastName, email, id } = this.state
        e.preventDefault()
        this.props.onSubmit({
            firstName, lastName, email, id
        })
        this.setState(this.props.defaultState)
    }
    componentDidUpdate(prevProps) {
        if (prevProps.initialValue !== this.props.initialValue) {
            this.setState({ ...this.props.initialValue, id: this.props.id })
        }
    }
    resetState = () => {
        this.setState(this.props.defaultState)
    }

    render() {
        const { firstName, lastName} = this.state
        const isFormValid = firstName.length > 0 && lastName.length > 0 && email.length > 0
        return (
            <form onSubmit={this.handleSubmit.bind(this)} className={s.formWrapper}>
                <span className={s.inputItem}>Add / Update</span>
                <input
                    type='hidden'
                    name='id'
                    value={this.props.id}
                />
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
                {
                    this.props.emailError && <div className={s.alert}>Email: {this.props.emailError} is already taken</div>
                }
                
                <div className={s.submitBtn}>
                    <button type='reset' onClick={this.resetState}>Reset</button>
                    <button type='submit' disabled={!isFormValid}>Submit</button>
                </div>
            </form>
        )
    }
}
export default AddUser