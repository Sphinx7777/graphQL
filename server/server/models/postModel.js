const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostModel = new Schema({
    title: String,
    description: String,
    authorId: { type: Schema.Types.ObjectId, ref: 'users' },
    title: String,
    author: Object,
    createdDate: Number,
    updateDate: Number
})

module.exports = mongoose.model('posts', PostModel)