import React, { useState } from 'react';
import RegisterForm from '../forms/registerForm';
import { useMutation } from '@apollo/react-hooks'
import { RegisterUser, CheckMail } from '../queries'
import { withRouter } from "react-router-dom";


const Register = (props) => {
    const [register] = useMutation(RegisterUser)
    const [check] = useMutation(CheckMail)
    const [emailError, setEmailError] = useState(null)
    const newUserSubmit = (data) => {
        check({
            variables: { email: data.email }
        }).then(response => {
            if (!response?.data?.checkMail?.email) {
                register({
                    variables: data
                })
                setEmailError(null)
                props.history.push('/users')
            } else {
                setEmailError(response?.data?.checkMail?.email)
            }
        })
    }
    return (
        <>
            <div className=''>
                <RegisterForm onSubmit={newUserSubmit} emailError={emailError} />
            </div>

        </>
    );
}

export default withRouter(Register);