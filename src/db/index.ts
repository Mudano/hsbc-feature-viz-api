import { db } from './config'
import { FeatureGraph } from '../__typedefs/graphql'
import { featureGraphToBubble, featureGraphToTimeline } from '../utils'

/**
 * SQL query joining various tables to construct the FeatureGraph type
 */
const selectAllFeatureGraphSQL = `
  SELECT
    *
  FROM
    prototyping.jira_viz_dummy;
`

const createFeatureGraphSql = `
  SELECT

  FROM
  
  ;
`

/**
 * Given a row result from a SQL query, return a FeatureGraph object
 * constructed from that row data
 * @param row
 */
const toFeatureGraph = (row: any): FeatureGraph => {
  return {
    id: row.id,
    featureName: row.featureName,
    bubbleData: {},
    // bubbleData: featureGraphToBubble(row),
    // timelineData: featureGraphToTimeline(row),
    quadData: {
      xCat: row.x_cat,
      yCat: row.y_cat,
      ragStatus: row.rag_status,
      rCat: row.r_cat
    },
    epic: row.epic,
    system: row.system,
    market: row.market,
    cluster: row.cluster,
    crossFunctionalTeam: row.cross_functional_team,
    pod: row.pod,
    agreedDependencies: [],
    inferredDependencies: [],
    users: [],
    // agreedDependencies: row.agreedDependencies ,
    // inferredDependencies: row.inferredDependencies ,
    // users: row.users ,
    dueDate: row.due_date,
    primaryFeature: row.primary_feature
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

const nextFeatureGraphShape = {
  id: 1, // Feature ID - probably has to be numeric
  xCat: -0.66, // coordinates for the quad plot - how will these be derived?
  yCat: 0.76,
  ragStatus: 'G1', // RAG status
  rCat: 4, // size of the quad bubble
  epic: 1, // Epic ID for this feature
  system: 1, // System ID for this feature
  agreedDependencies: [2, 6, 11], // Existing dependecies (ID's of other features) from the JIRA system
  inferredDependencies: [7, 5, 3], // Dependencies (ID's of other features) that might be inferred with Mudano ML
  feature: 'Bubble Viz', // Feature name / description
  market: 'UK',
  cluster: '',
  crossFunctionalTeam: '',
  pod: 'Engineering',
  users: [1, 2, 3], // Associated users. Assuming one feature can have many users. Currently ID, would probably want the full user objects returned
  dueDate: '01/01/2020',
  primary: true // should a field (bubble, or quad dot) be displayed with full opacity or not
}

const FeatureGraphShape = {
  id: 1, // Feature ID - probably has to be numeric
  xCat: -0.66, // coordinates for the quad plot - how will these be derived?
  yCat: 0.76,
  ragStatus: 'G1', // RAG status
  rCat: 4, // size of the quad bubble
  epic: 1, // Epic ID for this feature
  system: 1, // System ID for this feature
  agreedDependencies: [2, 6, 11], // Existing dependecies (ID's of other features) from the JIRA system
  inferredDependencies: [7, 5, 3], // Dependencies (ID's of other features) that might be inferred with Mudano ML
  feature: 'Bubble Viz', // Feature name / description
  market: 'UK',
  cluster: '',
  crossFunctionalTeam: '',
  pod: 'Engineering',
  users: [1, 2, 3], // Associated users. Assuming one feature can have many users. Currently ID, would probably want the full user objects returned
  dueDate: '01/01/2020',
  primary: true // should a field (bubble, or quad dot) be displayed with full opacity or not
}
