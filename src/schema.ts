import { mergeSchemas } from 'apollo-server';
import resolvers from './resolvers';
import featureGraph from './featureGraph/featureGraph.schema';
// export default gql`

// `

const createSchema = async () =>
  mergeSchemas({
    schemas: [featureGraph],
    resolvers
  });

export default createSchema;
