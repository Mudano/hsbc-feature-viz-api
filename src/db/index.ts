import { pgDb, sqliteDb } from './config'
import { db2ConnectionString, db2Pool } from './config'
import { Feature } from '../__typedefs/graphql'
import { sqlRowsToFeatureGraphs } from '../utils'

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
  SELECT * FROM table;
`

const sqliteSelectAllIssuesSql = `
  SELECT
    *
  FROM
    jira_issues_with_dep;
`

const sqliteSelectAllDependenciesSql = `
  SELECT 
    * 
  FROM
    jira_issues;
`
const sqliteFeatureGraphsSql = `
  SELECT
    x AS id,
    x AS featureName,
    x AS x_cat,
    x AS y_cat,
    x AS rag_status,
    x AS r_cat,
    x AS epic,
    x AS system,
    x AS market,
    x AS cluster,
    x AS cross_functional_team,
    x AS pod,
    x AS due_date
  FROM
    features
  JOIN 
    
`

/**
 * SQLITE FUNCTIONS
 * https://github.com/kriasoft/node-sqlite
 */
export const sqliteQuery = async (sql: string) => {
  try {
    const db = await sqliteDb
    // @ts-ignore
    console.log('💾 [Sqlite3] querying', db.driver.filename)
    return db.all(sql)
  } catch (error) {
    console.error(`💾 [sqlite] query error:`, error)
  }
}

/**
 * Query multiple tables and join results
 */
// export const queryAndJoin = async () => {
//   try {
//     const issuesWithDep = await sqliteQuery(sqliteSelectAllIssuesSql)
//     const allIssues = await sqliteQuery(sqliteSelectAllDependenciesSql)
//     // @ts-ignore
//     return issuesWithDep.map(i => {
//       return {
//         ...i,
//         // @ts-ignore
//         dependencies: allIssues.filter(ai => ai.issuekey === i.don_story)
//       }
//     })
//   } catch (error) {
//     console.error(`💾 [sqlite] quer error:`, error)
//   }
// }
export const queryAndJoin = async () => {
  try {
    const featureGraphs = await sqliteQuery(sqliteFeatureGraphsSql)
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
 *
 * TODO: how to run DB2 queries using async / await - though it might not be needed if querySync gives the
 * same behaviour
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
  console.log(`💾 [POSTGRES] ${results.length} results returned`)
  // console.log('1st result:', results[0])
  return sqlRowsToFeatureGraphs(results)
}
