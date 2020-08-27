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
            _id
        }
    }
`