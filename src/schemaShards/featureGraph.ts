import { getFeatureGraphs } from '../db'
import { gql } from 'apollo-server'

const typeDefs = gql`
  extend type Query {
    featureGraphs: [FeatureGraph]!
    featureGraph(id: ID!): FeatureGraph
  }

  type FeatureGraph {
    issueKey: String
    title: String
    description: String
    storyPoint: String
    project: String
    assigneeProjects: AssigneeProjects
    benStory: Issue
    # donStory: Issue
  }

  type Issue {
    issueKey: String
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
