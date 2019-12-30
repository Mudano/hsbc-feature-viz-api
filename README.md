# Mudano - HSBC Experience API

## Development

### Current point of development

- featuresToTimeline function in utils.ts is halfway refactored - this needs finishing to produce dynamic data - it was hardwired before. A new structure has been implemented which can be seen in the type definitions in `db/schemaShards/featureGraph.ts`
- unit tests are mostly written

### Environment Variables & DB connection

This repo contains connectors for PostgresQL (via pg-promise), SQLite and DB2.

Create a `.env` file based on the `.env.template` file, and fill in the required fields, depending on the desired database connection (DB2 or postgres)

### `npm start`

Runs the app locally on `http://localhost:4000`. The server will automatically restart as you make code changes.

### `npm run prettier`

Runs the code formatter across all files.

### `npm run test`

Runs the unit tests.

### Code Generation

[graphql-code-generator](https://graphql-code-generator.com) is used to generate the equivalent TypeScript definitions based on the schema output by the server. To generate these types, ensure the server is up and running locally (this will mean that your schema needs to be in place before writing any resolvers utilising the types), then:

```bash
npm run graphql:codegen
```

graphql-code-generator is configuer via the `codegen.yml` file in the root of the project
