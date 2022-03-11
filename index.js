'use strict'

const Fastify = require('fastify')
const mercurius = require('mercurius')

const app = Fastify()

const schema = `
  type Query {
    ip: String
  }
`

const resolvers = {
  Query: {
    ip: async (_, { }, context) => {
      return context.reply.request.ip
    }
  }
}

app.register(require('fastify-cors'), {
  origin: true
})

app.register(mercurius, {
  schema,
  resolvers,
  graphiql: true
})

app.get('/ip', async function (request) {
  return request.ip
})

app.listen(process.env.PORT || 80, '0.0.0.0')