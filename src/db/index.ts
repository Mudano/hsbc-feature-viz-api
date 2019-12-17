import { pgDb, sqliteDb } from './config'
import { db2ConnectionString, db2Pool } from './config'
import { FeatureGraph } from '../__typedefs/graphql'
import { featureGraphToBubble, featureGraphToTimeline } from '../utils'

/**
 * Given a row result from a SQL query, return a FeatureGraph object
 * constructed from that row data
 * @param row
 */
export const toFeatureGraph = (row: any): FeatureGraph => {
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
 * SQL queries
 */
const pgSelectAllFeatureGraphSQL = `
  SELECT
    *
  FROM
    prototyping.jira_viz_dummy
`

const db2Sql = `
  SELECT * FROM blah
`

const sqliteSelectAllIssuesSql = `
  SELECT
    *
  FROM
    jira_issues
`

/**
 * SQLITE FUNCTIONS
 * https://github.com/kriasoft/node-sqlite
 */
export const sqliteQuery = async () => {
  try {
    const db = await sqliteDb
    // @ts-ignore
    console.log('💾 [Sqlite3] querying', db.driver.filename)
    const results = db.all(sqliteSelectAllIssuesSql)
    return results
  } catch (error) {
    console.error(`💾 [sqlite] query error:`, error)
  }
}

export const queryAndJoin = async () => {
  try {
    const db = await sqliteDb
    // @ts-ignore
    console.log('💾 [Sqlite3] querying', db.driver.filename)
    const results = db.all(sqliteSelectAllIssuesSql)
    return results
  } catch (error) {
    console.error(`💾 [sqlite] quer error:`, error)
  }
}

/**
 * DB2 FUNCTIONS
 * https://github.com/ibmdb/node-ibm_db/
 *
 * Connection Errors
 * https://www.ibm.com/support/pages/ibmslapd-cannot-connect-db2-database-and-gets-unsupported-function-error
 */
// export const db2Query = (sql: string, callBack: Function) => {
export const db2Query = () => {
  let result
  db2Pool.open(db2ConnectionString, (err: any, conn: any) => {
    if (err) return console.error(`💾 [DB2] connection error:`, err)
    try {
      result = conn.querySync(db2Sql)
    } catch (error) {
      console.error(`💾 [DB2] query error:`, err)
    }
  })
  return result
}

/**
 * POSTGRES FUNCTIONS
 */

/**
 * Return a list of FeatureGraph objects
 */
export async function pgQuery(): Promise<any> {
  const results = await pgDb.any(pgSelectAllFeatureGraphSQL)
  console.log(results.length, 'results returned')
  return results.map((rfg: any): FeatureGraph => toFeatureGraph(rfg))
}
