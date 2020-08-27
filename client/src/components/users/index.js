import React, { useState, useEffect } from 'react';
import s from './users.module.scss';
import { getUsers, addUserMutation, removeUserMutation, updateUserMutation, CheckMail } from '../queries/index'
import AddUser from './addUser';
import { useQuery, useMutation } from '@apollo/react-hooks'


const Users = (props) => {
    const [id, setId] = useState('')
    const [emailError, setEmailError] = useState(null)
    const defaultState = {
        firstName: '',
        lastName: '',
        email: '',
        id: ''
    }
    const [initialValue, setInitialValue] = useState(defaultState)
    const { loading, data } = useQuery(getUsers)
    const [remove] = useMutation(removeUserMutation, { refetchQueries: [{ query: getUsers }] })
    const [update] = useMutation(updateUserMutation, { refetchQueries: [{ query: getUsers }] })
    const [add] = useMutation(addUserMutation, { refetchQueries: [{ query: getUsers }] })
    const [check, res] = useMutation(CheckMail)
    const users = data?.getUsers || []

    const handlesSubmit = (data) => {
        if (data?.id?.length > 0) {
            update({
                variables: data
            })
        } else {
            check({
                variables: { email: data.email }
            }).then(response => {
                if (!response?.data?.checkMail?.email) {
                    add({
                            variables: data
                        })
                        setEmailError(null)                   
                } else {
                    setEmailError(response?.data?.checkMail?.email)
                }
            })
        }
    }
    const removeUser = (id) => {
        remove({
            variables: {
                id
            }
        })
    }
    const updateUser = (id) => {
        const updateUser = users.filter(user => user._id === id)
        setId(id)
        updateUser[0] && setInitialValue({ ...updateUser[0] })
    }
    if (loading) {
        return (
            <div className={s.wrapper}>Loading users ...</div>
        )
    }

    return (
        <>
            <div className={s.wrapper}>
                <ul>
                    {users.map(user => (
                        <li className={s.userItem} key={user._id}>
                            <span className={s.remove} onClick={() => removeUser(user._id)}>Remove</span>
                            <span className={s.update} onClick={() => updateUser(user._id)}>Update</span>
                            <span>{user.firstName} {user.lastName}</span>
                            <span>{user.email}</span>
                            <hr className={s.full} />
                        </li>
                    ))}
                </ul>
            </div>
            <div className={s.addWrapper}>
                <AddUser onSubmit={handlesSubmit} id={id} initialValue={initialValue} defaultState={defaultState} emailError={emailError} />
            </div>
        </>
    );
}

export default Users;