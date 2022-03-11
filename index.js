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

app.register(mercurius, {
  schema,
  resolvers,
  graphiql: true
})

app.get('/ip', async function (request) {
  return request.ip
})

app.listen(process.env.PORT || 5000, '0.0.0.0')