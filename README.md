# Mudano - HSBC Experience API

## Development

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
