import { ApolloServer, Config } from 'apollo-server'
import { makeExecutableSchema } from 'graphql-tools'
import { config } from 'dotenv'
import { rawSchema } from './schema'

/**
 * NOTE: this is currently generating a server using the apollo-server package.
 *
 * Commented out code is to use the apollo-server-express package. I (@lsalmins)
 * opted for the apollo-server in the interest of getting this operational. I haven't
 * research what the benefits of using apollo-server-express would be, but that would stand
 * as a probable TODO for productionisation
 */

// import express from 'express'

// const cors = require('cors')
// const bodyParser = require('body-parser')
// const compression = require('compression')

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

  // app.listen({ port }), () => {
  //   console.info(`🚀 Server ready at http://localhost:${port}`)
  //   console.info(`🚀 GraphQL endpoint ready at http://localhost:${port}${server.graphqlPath}`)
  // }

  server.listen(port).then(({ url }) => {
    console.info(`🚀  Server ready at ${url}`)
  })
}

export default server
