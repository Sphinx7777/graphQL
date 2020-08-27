import React from 'react';
import s from '../users/users.module.scss';
import { getPosts } from '../queries/index'
import { useQuery, useMutation } from '@apollo/react-hooks'


const Posts = () => {

    const { loading, data } = useQuery(getPosts)
    const posts = data?.getPosts || []
    if (loading) {
        return (
            <div className={s.wrapper}>Loading users ...</div>
        )
    }
console.log('data', data)
    return (
        <>
            <div className={s.postWrapper}>
                <ul>
                {posts.map(post => (
                        <li className={s.userItem} key={post._id}>
                            <div className={s.headItem}>Author</div>
                            <div className={s.infoItem}>{post.author?.firstName} {post.author?.lastName}</div>
                            <div className={s.headItem}>Title</div>
                            <div className={s.infoItem}>{post.title}</div>
                            <div className={s.headItem}>Description</div>
                            <div className={s.infoItem}>{post.description}</div>
                            <hr className={s.full} />
                        </li>
                    ))}
                </ul>
            </div>
           
        </>
    );
}

export default Posts;