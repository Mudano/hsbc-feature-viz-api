import { ApolloServer } from 'apollo-server-express';
import { config } from 'dotenv';
import createSchema from './schema';
// import schema from './schema'
import express from 'express';
// import exportController from './export/exportController';

import DataLoader from 'dataloader';
// import DataLoader = require('dataloader)

// import { JiraCustomFieldOption } from './__generated__graphql';

// import jiraFeatureEnumerationsLoader from './jira/features/enumerations/jiraFeatureEnumerationsLoader';

const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');

async function server() {
  config();

  const {
    PORT,
    NODE_ENV,
    PROD_GRAPHQL_INTROSPECTION,
    PROD_GRAPHQL_PLAYGROUND
    // NODE_EXTRA_CA_CERTS
  } = process.env;

  const port = PORT || 4000;

  // const introspection =
  //   NODE_ENV === 'production' ? PROD_GRAPHQL_INTROSPECTION === 'true' : true;

  // const playground =
  //   NODE_ENV === 'production' ? PROD_GRAPHQL_PLAYGROUND === 'true' : true;

  // if (!NODE_EXTRA_CA_CERTS) {
  //   console.error(` The NODE_EXTRA_CA_CERTS env var has not been set. Please see README.md for more info`);
  //   process.exit(1);

  // }
  // const context: Context = {
  //   jiraFeatureEnumerationsLoader
  // }

  const app = express();

  const server: ApolloServer = new ApolloServer({
    schema: await createSchema()
    // context,
    // introspection,
    // playground
  });

  app.use(bodyParser);
  app.use(cors());
  app.use(compression());

  server.applyMiddleware({ app });

  // exportController(app)

  app.listen({ port }),
    () => {
      // console.info(`GraphQL Playground: ${playground}`)
      // console.info(`GraphQL Introspection: ${introspection}`)
      console.info(`Production: ${NODE_ENV === 'production'}`);
      console.info(`Experience API ready at http://localhost:${port}`);
      console.info(
        `GraphQL endpoint ready at http://localhost:${port}${server.graphqlPath}`
      );
    };
}

export default server;

// export type Context = {
//   jiraFeatureEnumerationsLoader: DataLoader<string, JiraCustomFieldOption[]>
// }
