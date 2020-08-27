import React, { useState } from 'react';
import s from './users.module.scss';
import { getUsers, getPosts, addUserMutation, removeUserMutation, updateUserMutation, CheckMail, addNewPost } from '../queries/index'
import AddUser from '../forms/addUser';
import { useQuery, useMutation } from '@apollo/react-hooks'
import NewPostForm from '../forms/NewPostForm'


const Users = () => {
    const [id, setId] = useState('')
    const [emailError, setEmailError] = useState(null)
    const defaultState = {
        firstName: '',
        lastName: '',
        email: '',
        id: ''
    }
    const [initialValue, setInitialValue] = useState(defaultState)
    const [newPostId, setNewPostId] = useState(null)
    const { loading, data } = useQuery(getUsers)
    const [remove] = useMutation(removeUserMutation, { refetchQueries: [{ query: getUsers }, { query: getPosts }] })
    const [update] = useMutation(updateUserMutation)
    const [createPost] = useMutation(addNewPost, { refetchQueries: [{ query: getPosts }]})
    const [add] = useMutation(addUserMutation, { refetchQueries: [{ query: getUsers }] })
    const [check] = useMutation(CheckMail)
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
                        return Promise.resolve('true')            
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
    const addPost = (id) => {
        setNewPostId(newPostId ? null : id)
    }
    const updateUser = (id) => {
        const updateUser = users.filter(user => user._id === id)
        setId(id)
        updateUser[0] && setInitialValue({ ...updateUser[0] })
    }

    const newPostSubmit = (data) => {
        data.authorId = newPostId
        createPost({
            variables: {...data}, refetchQueries: [{ query: getPosts }] 
        }).then(p => {
            if (p?.data?.addPost) {
                setNewPostId(null)
            }
        })
    }

    const closeModal = () => setNewPostId(null)

    const stopPropagation = e => e.stopPropagation()

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
                            <span className={s.update} onClick={() => addPost(user._id)}>Add post</span>
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
            {
                newPostId && 
                <div className={s.modalWrapper} onClick={closeModal}>
                    <div className={s.modal} onClick={stopPropagation}>
                        <NewPostForm onSubmit={newPostSubmit}/>
                    </div>

                </div>
            }
        </>
    );
}

export default Users;