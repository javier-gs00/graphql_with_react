const express = require('express')
const expressQraphQL = require('express-graphql')
const schema = require('./schema/schema')

const app = express()

app.use('/graphql', expressQraphQL({
  schema,
  graphiql: true
}))

app.listen(4000, () => {
  console.log('listening on port 4000')
})