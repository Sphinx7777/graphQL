import { gql } from 'apollo-boost'

export const getUsers = gql`
query getUsers{ 
    getUsers {
        firstName
        lastName
        _id
        email
    }
}
`
export const getPosts = gql`
query getPosts{ 
    getPosts {
        title
        description
        _id
        createdDate
        author {
            firstName
            lastName
            _id
        }
    }
}
`
export const CheckMail = gql`
    mutation checkMail($email: String) {
        checkMail(email: $email) {
            email
        }
    }
`
export const addUserMutation = gql`
    mutation($firstName: String, $lastName: String, $email: String) {
        addUser(firstName: $firstName, lastName: $lastName, email: $email) {
            firstName
            lastName
            email
            _id
        }
    }
`

export const RegisterUser = gql`
    mutation($firstName: String, $lastName: String, $email: String, $password: String) {
        register(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
            firstName
            lastName
            email
            password
        }
    }
`

export const addNewPost = gql`
    mutation($title: String, $description: String, $authorId: ID) {
        addPost(title: $title, description: $description, authorId: $authorId) {
            title
            description
            createdDate
            _id
        }
    }
`
export const removeUserMutation = gql`
    mutation removeUser($id: ID) {
        removeUser(id: $id) {
            _id
        }
    }
`
export const updateUserMutation = gql`
    mutation($id: ID, $firstName: String, $lastName: String, $email: String) {
        updateUser(id: $id, firstName: $firstName, lastName: $lastName, email: $email) {
            firstName
            lastName
            email
            _id
        }
    }
`