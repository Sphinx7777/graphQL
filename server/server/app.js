const express = require('express')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')
const mongoose = require('mongoose')
const schema = require('./schemas/schema')

const app = express()
const PORT = '3005'

app.use(cors())
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))
mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    dbName: "GraphQL"
})
mongoose.connection.on('error', err => console.log(`DB connection error: ${err}`))
mongoose.connection.once('open', () => console.log('> Connected to DB!'))

app.listen(PORT, err => {
    if (err) throw err
    console.log(`> Server has started on http://localhost:${PORT}`)
})