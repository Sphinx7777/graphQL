const graphql = require('graphql')
const UserModel = require('../models/userModel')
const PostModel = require('../models/postModel')

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLNonNull, GraphQLList, GraphQLFloat } = graphql

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
const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        title: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        _id: { type: GraphQLNonNull(GraphQLID) },
        authorId: { type: GraphQLID },
        author: {
            type: UserType,
                resolve(parent) {
                const author = UserModel.findById(parent.authorId)
                return author
            }
        },
        createdDate: { type: GraphQLFloat },
        updateDate: { type: GraphQLFloat }
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
        },
        getPosts: {
            type: GraphQLList(PostType),
            async resolve() {
                const posts = await PostModel.find({})
                return posts
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addPost: {
            type: PostType,
            args: { 
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                authorId: { type: GraphQLID }
        
        },
            async resolve(parent, { title, description, authorId }) {
                const createdDate = new Date().getTime()
                const post = new PostModel({ title, description, authorId, createdDate })
                return await post.save()
            }
        },
        removeUser: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, { id }) {
                await PostModel.findOneAndDelete({ authorId: id })
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
        },
        login: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            async resolve(parent, { firstName, lastName, email, id }) {
                return user = await UserModel.findByIdAndUpdate(id, { $set: { firstName, lastName, email } }, { new: true });
            }
        },
        register: {
            type: UserType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            async resolve(parent, { firstName, lastName, email, password}) {
                const user = new UserModel({ firstName, lastName, email, password});
                return user.save()
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})

