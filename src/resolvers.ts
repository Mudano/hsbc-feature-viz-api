// import { DateTime } from 'graphql-scalars'
import featureGraph from './featureGraph/featureGraph.resolver';

export type ResolverContext = {
  [key: string]: any;
  loaders: {};
};

const resolvers = {
  // DateTime,
  featureGraph
};

export default resolvers;
