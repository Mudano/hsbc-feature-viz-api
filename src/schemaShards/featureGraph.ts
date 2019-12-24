import { pgQuery } from '../db'
import { gql } from 'apollo-server'
import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'
import { filters } from '../utils'

const typeDefs = gql`
  scalar Date
  extend type Query {
    featureGraphs(filter: FeatureGraphFilterInput): FeatureGraphs!
    filters: Filters
  }

  input FeatureGraphFilterInput {
    featureName: String
    market: String
    cluster: String
    crossFunctionalTeam: String
    pod: String
    # featureName: StringFilterInput
    # market: StringFilterInput
    # cluster: StringFilterInput
    # crossFunctionalTeam: StringFilterInput
    # pod: StringFilterInput
  }

  # input StringFilterInput {
  #   ne: String
  #   eq: String
  #   le: String
  #   lt: String
  #   ge: String
  #   gt: String
  #   contains: String
  #   notContains: String
  #   between: [String]
  #   beginsWith: String
  # }

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
    agreedDependencies: [Int]
    inferredDependencies: [Int]
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
    group: Int # colour
    size: Int # budget
  }

  type FeatureGraphs {
    features: [Feature]
    bubbleFeatures: BubbleData
    quadFeatures: [QuadData]
    timelineFeatures: TimelineData
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
    id: Int
    agreedDependencies: [Int]
    primaryFeature: Boolean
    group: Int # colour
    size: Int # budget
  }

  type BubbleLink {
    # both of these are Feature IDs
    source: Int
    target: Int
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
    primaryFeature: Boolean
  }

  type _TimelineData {
    label: String
    type: String
    customClass: String
    at: Date
  }

  type TimelineFeature {
    type: String
    at: Date
    label: String
    customClass: String
  }

  type HighlightedFeature {
    label: String
    data: [TimelineFeature]
  }

  type TimelineData {
    highlightedFeature: HighlightedFeature
    marketActivation: [TimelineFeature]
    dependencies: [TimelineFeature]
  }

  type Filter {
    name: String
    label: String
    options: [String]
  }

  type Filters {
    epic: [String]
    system: [String]
    user: [String]
    feature: Filter
    market: Filter
    cluster: Filter
    crossFunctionalTeam: Filter
    pod: Filter
    ragStatus: Filter
  }
`
export default {
  resolvers: {
    Query: {
      // featureGraphs: async () => await pgQuery(),
      // @ts-ignore
      // featureGraphs: async (parent, args, context, filter) => {
      featureGraphs: async (_, { filter }) => {
        // items to filter by, to be used to construct WHERE on query
        // const { featureName, market, cluster, crossFunctionalTeam, pod } = filter
        console.log('filters: ', filter)
        return await pgQuery(filter)
      },
      filters: () => filters()
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
