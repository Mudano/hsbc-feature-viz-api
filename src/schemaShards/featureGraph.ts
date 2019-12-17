import { pgQuery, sqliteQuery } from '../db'
import { gql } from 'apollo-server'

// TODO: complete timeline type
// TODO: complete bubble type
// TODO: check all @ts-ignores

const typeDefs = gql`
  extend type Query {
    featureGraphs: [FeatureGraph]!
    featureGraph(id: ID!): FeatureGraph
    testIssues: [TestIssue]
  }

  type TestIssue {
    issueKey: String
    title: String
    description: String
    storypoint: String
    project: String
    dependencies: [TestIssue]
  }

  type FeatureGraph {
    id: String
    bubbleData: BubbleData
    quadData: QuadData
    # timelineData: TimelineData
    epic: String
    system: String
    agreedDependencies: [String]
    # agreedDependencies: FeatureGraph[]
    inferredDependencies: [String]
    # inferredDependencies: FeatureGraph[]
    featureName: String
    market: String
    cluster: String
    crossFunctionalTeam: String
    pod: String
    users: [String]
    # users: User[]
    # TODO https://github.com/excitement-engineer/graphql-iso-date change to date type
    dueDate: String
    primaryFeature: Boolean
  }

  type User {
    id: String
    name: String
  }

  type Epic {
    id: String
    name: String
    features: [String]
    featureCount: Int
  }

  type System {
    id: String
    name: String
    features: [String]
    featureCount: Int
  }

  type BubbleData {
    nodes: [String]
    links: [String]
  }

  type QuadData {
    xCat: String
    yCat: String
    ragStatus: String
    rCat: String
  }

  type TimelineData {
    label: String
    # data:
  }
`
export default {
  resolvers: {
    Query: {
      featureGraphs: async () => await pgQuery(),
      testIssues: async () => await sqliteQuery()
      // featureGraphs: () => getFeatureGraphs(printRows)
    }
  },
  typeDefs: [typeDefs]
}
