const graphql = require('graphql')
const UserModel = require('../models/userModel')

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLNonNull, GraphQLList } = graphql

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        firstName: { type: GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        _id: { type: GraphQLNonNull(GraphQLID) },
        token: { type: GraphQLString },
        password: { type: GraphQLString },
        role: { type: GraphQLString },
        fullName: { type: GraphQLString },
        createdDate: { type: GraphQLString },
        lastDateOfActive: { type: GraphQLString },
    })
})
const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        getUsers: {
            type: GraphQLList(UserType),
            async resolve() {
                const users = await UserModel.find({}, '-password -token')
                return users
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        removeUser: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, { id }) {
                const user = await UserModel.findByIdAndDelete(id)
                return user
            }
        },
        checkMail: {
            type: UserType,
            args: { email: { type: GraphQLString } },
            async resolve(parent, { email }) {
                const user = await UserModel.findOne({ email }, '-password -token')
                return user

            }
        },
        addUser: {
            type: UserType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString }
            },
            async resolve(parent, { firstName, lastName, email }) {
                const user = new UserModel({
                    firstName,
                    lastName,
                    email
                })
                return user.save().then(
                    user => user
                )
            }
        },
        updateUser: {
            type: UserType,
            args: {
                id: { type: GraphQLID },
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString }
            },
            async resolve(parent, { firstName, lastName, email, id }) {
                return user = await UserModel.findByIdAndUpdate(id, { $set: { firstName, lastName, email } }, { new: true });
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})

