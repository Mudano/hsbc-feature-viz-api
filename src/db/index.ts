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
// export const db2Query = () => {
//   let result
//   db2Pool.open(db2ConnectionString, (err: any, conn: any) => {
//     if (err) return console.error(`💾 [DB2] connection error:`, err)
//     try {
//       result = conn.querySync(db2Sql)
//     } catch (error) {
//       console.error(`💾 [DB2] query error:`, err)
//     }
//   })
//   return result
// }

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
