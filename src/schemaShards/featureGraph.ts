import { getFeatureGraphs } from '../db'
import { gql } from 'apollo-server'

const typeDefs = gql`
  extend type Query {
    featureGraphs: [FeatureGraph]!
    featureGraph(id: ID!): FeatureGraph
  }

  type FeatureGraph {
    issuekey: String
    assigneeProjects: AssigneeProjects
    donStory: Issue
    benStory: Issue
  }

  type Issue {
    issuekey: String
    title: String
    description: String
    storyPoint: String
    project: String
  }

  type AssigneeProjects {
    id: ID
    assignee: String
    project: String
  }
`
export default {
  resolvers: {
    Query: {
      featureGraphs: async () => await getFeatureGraphs()
      // featureGraphs: () => getFeatureGraphs(printRows)
    }
  },
  typeDefs: [typeDefs]
}
