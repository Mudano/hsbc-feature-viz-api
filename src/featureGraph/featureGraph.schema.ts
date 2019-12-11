import { gql } from 'apollo-server';

export default gql`
  # extend type Query {
  #   jira: Jira!
  # }

  # type Jira {
  #   features(
  #     filter: [JiraFilter!]
  #     sort: [Sort!]
  #     cursor: PageCursorInput
  #   ): JiraFeatures!
  #   enumerations: JuraEnumerations!
  # }
  # entry point into our schema that describes what data we can fetch
  type Query {
    featureGraph: [FeatureGraph]!
    featureGraph(id: ID!): FeatureGraph
  }

  # type Feature {
  #   featureGraph: FeatureGraph
  # }

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
`;
