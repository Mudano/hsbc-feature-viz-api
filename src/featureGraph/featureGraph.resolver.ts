// import { find } from 'lodash'

const featureGraphs = {};

const featureGraph = {
  Query: {
    featureGraphs: () => featureGraphs
    // featureGraph: (_, { id }) => find(featureGraph, { id })
  }
};

export default featureGraph;
