import { gql } from 'apollo-server';
import { mergeRawSchemas } from './utils';
import schemaShards from './schemaShards/featureGraph';

export const rawSchema = mergeRawSchemas(
  {
    typeDefs: [
      // create empty main types, to be extended in shards
      gql`
        type Query {
          _empty: String
        }
      `
    ],
    resolvers: {}
  },
  schemaShards
);
