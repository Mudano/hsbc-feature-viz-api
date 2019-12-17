import { pgQuery, queryAndJoin } from '../db'
import { gql } from 'apollo-server'
import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

const typeDefs = gql`
  scalar Date
  extend type Query {
    featureGraphs: FeatureGraphs!
    # featureGraph(id: ID!): Feature
    testIssues: [TestIssue]
  }

  type TestIssue {
    issuekey: String
    title: String
    description: String
    storypoint: String
    project: String
    dependencies: [TestIssue]
  }

  # these are not required by the front end, apart from the filters,
  # but they are requird when filtering and return the list of graphDatas
  type Feature {
    id: String
    featureName: String
    epic: String
    system: String
    market: String
    cluster: String
    crossFunctionalTeam: String
    pod: String
    agreedDependencies: [String]
    # agreedDependencies: Feature[]
    inferredDependencies: [String]
    # inferredDependencies: Feature[]
    users: [String]
    # users: User[]
    dueDate: Date
    primaryFeature: Boolean
    # QuadData Fields
    xCat: String
    yCat: String
    ragStatus: String
    rCat: String
    # BubbleData Fields
    colour: String
    budget: String
  }

  type FeatureGraphs {
    features: [Feature]
    bubbleFeatures: BubbleData
    quadFeatures: [QuadData]
    timelineFeatures: [TimelineData]
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

  type BubbleNode {
    id: String
    agreedDependencies: [String]
    primaryFeature: String
    group: String
    colour: String
  }

  type BubbleLink {
    # both of these are Feature IDs
    source: String
    target: String
  }

  type BubbleData {
    nodes: [BubbleNode]
    links: [BubbleLink]
  }

  type QuadData {
    id: String
    xCat: String
    yCat: String
    ragStatus: String
    rCat: String
    featureName: String
    primaryFeature: String
  }

  type _TimelineData {
    label: String
    type: String
    customClass: String
    at: Date
  }

  type TimelineData {
    label: String
    data: [_TimelineData]
  }
`
export default {
  resolvers: {
    Query: {
      featureGraphs: async () => await pgQuery(),
      testIssues: async () => await queryAndJoin()
      // bubbleFeatures: async () => bubbleFeatures(),
      // quadFeatures: async () => quadFeatures(),
      // timelineFeatures: async () => timelineFeatures()
    },
    // using the implementation from the docs
    // https://www.apollographql.com/docs/graphql-tools/scalars/#date-as-a-scalar
    // https://stackoverflow.com/questions/49693928/date-and-json-in-type-definition-for-graphql
    // TODO: do we want to switch to this implementation:
    // https://github.com/excitement-engineer/graphql-iso-date
    Date: new GraphQLScalarType({
      name: 'Date',
      description: 'Date custom scalar type',
      parseValue(value) {
        return new Date(value) // value from the client
      },
      serialize(value) {
        return value.getTime() // value sent to the client
      },
      parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
          return parseInt(ast.value, 10) // ast value is always in string format
        }
        return null
      }
    })
  },
  typeDefs: [typeDefs]
}
