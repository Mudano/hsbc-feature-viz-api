import { getFeatureGraphs } from '../db'
import { gql } from 'apollo-server'

const typeDefs = gql`
  extend type Query {
    featureGraphs: [FeatureGraph]!
    featureGraph(id: ID!): FeatureGraph
  }

  type FeatureGraph {
    issueKey: String
    assigneeProjects: AssigneeProjects
    donStory: Issue
    benStory: Issue
  }

  type Issue {
    issueKey: String
    title: String
    description: String
    storyPoint: String
    project: String
  }

  type AssigneeProjects {
    id: Int
    assignee: String
    project: String
  }
`
export default {
  resolvers: {
    Query: {
      featureGraphs: () => getFeatureGraphs()
    }
  },
  typeDefs: [typeDefs]
}
