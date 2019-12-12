// import { ApolloServer, Config, makeExecutableSchema } from 'apollo-server-express'
import { ApolloServer, Config } from 'apollo-server'
import { makeExecutableSchema } from 'graphql-tools'
import { config } from 'dotenv'
import { rawSchema } from './schema'
import express from 'express'

// TODO: change config to remove semicolons
// TODO: write tests
// TODO: annotate all functions

const cors = require('cors')
const bodyParser = require('body-parser')
const compression = require('compression')

function server() {
  config()

  const { PORT } = process.env

  const port = PORT || 4000

  // const app = express()

  /**
   * We create a schema with makeExecutableSchema. This executable schema is the optimized
   * version of our GraphQL schema with the resolvers, it matches GraphQL endpoints to functions
   * that return the responses.
   */
  const schema = makeExecutableSchema(rawSchema)

  const serverConfig: Config = {
    schema,
    // context,
    // subscriptions,
    playground: {
      settings: {
        'editor.theme': 'dark',
        'editor.cursorShape': 'line'
      }
    }
  }

  const server: ApolloServer = new ApolloServer(serverConfig)

  // app.use(bodyParser)
  // app.use(cors())
  // app.use(compression())

  // server.applyMiddleware({ app })

  // exportController(app)

  // app.listen({ port }),
  //   () => {
  //     // console.info(`Production: ${NODE_ENV === 'production'}`)
  //     console.info(`🚀 API ready at http://localhost:${port}`)
  //     console.info(
  //       `GraphQL endpoint ready at http://localhost:${port}${server.graphqlPath}`
  //     )
  //   }
  // app.listen({ port }), () => {
  //   console.info(`🚀 Server ready at http://localhost:${port}`)
  //   console.info(`🚀 GraphQL endpoint ready at http://localhost:${port}${server.graphqlPath}`)
  // }
  server.listen(port).then(({ url }) => {
    console.info(`🚀 Server ready at ${url}`)
    // console.info(`🚀 GraphQL endpoint ready at ${url}${server.graphqlPath}`)
  })
}

export default server
