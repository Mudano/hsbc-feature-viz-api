import { db } from './config'
import { FeatureGraph } from '../__generated__/graphql'

/**
 * SQL query joining various tables to construct the FeatureGraph type
 */
const selectAllFeatureGraphSQL = `
  SELECT
    ji.issuekey,
    ji.title,
    ji.description,
    ji.storypoint,
    ji.project,
    jap. "Assignee",
    jidon.issuekey AS don_story_issuekey,
    jidon.title AS don_story_title,
    jidon.description AS don_story_description,
    jidon.storypoint AS don_story_storypoint,
    jidon.project AS don_story_project
  FROM
    prototyping.jira_issues_with_dep ji
    LEFT JOIN prototyping.jira_assignee_projects jap ON jap.project = ji.project
    LEFT JOIN prototyping.jira_issues_with_dep jidon ON jidon.issuekey = ji.don_story;
`

/**
 * Given a row result from a SQL query, return a FeatureGraph object
 * constructed from that row data
 * @param row
 */
const toFeatureGraph = (row: any): FeatureGraph => {
  return {
    issueKey: row.issuekey,
    title: row.title,
    description: row.description,
    storyPoint: row.storypoint,
    project: row.project,
    benStory: {
      issueKey: row.don_story_issuekey,
      title: row.don_story_title,
      description: row.don_story_description,
      storyPoint: row.don_story_storypoint,
      project: row.don_story_project
    }
  }
}

/**
 * Return a list of FeatureGraph objects
 */
export async function getFeatureGraphs(): Promise<any> {
  const rawFeatureGraphs = await db.any(selectAllFeatureGraphSQL)
  console.log(rawFeatureGraphs.length)
  return rawFeatureGraphs.map((rfg: any): FeatureGraph => toFeatureGraph(rfg))
}
