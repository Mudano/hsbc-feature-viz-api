import { pgDb, sqliteDb } from './config'
import { db2ConnectionString, db2Pool } from './config'
import { Feature } from '../__typedefs/graphql'
import { sqlRowsToFeatureGraphs, joinQuerys } from '../utils'

/**
 * SQL queries
 */
const pgSelectAllFeatures = `
  SELECT
    *
  FROM
    prototyping.jira_viz_dummy
`

const pgSelectAllDeps = `
  SELECT 
    *
  FROM
    prototyping.agreed_dependencies
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
  const features = await pgDb.any(pgSelectAllFeatures)
  const dependencies = await pgDb.any(pgSelectAllDeps)
  // console.log(dependencies)
  console.log(`💾 [POSTGRES] ${features.length} features returned`)
  console.log(`💾 [POSTGRES] ${dependencies.length} dependencies returned`)

  const joined = joinQuerys(features, dependencies)
  return sqlRowsToFeatureGraphs(joined)
}
