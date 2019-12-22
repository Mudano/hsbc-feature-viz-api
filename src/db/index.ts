import { pgDb, sqliteDb } from './config'
import { db2ConnectionString, db2Pool } from './config'
import { Feature } from '../__typedefs/graphql'
import { sqlRowsToFeatureGraphs, joinQuerys, filters } from '../utils'

/**
 * Given a CamelCase string, return the string in snake_case
 * @param str
 */
const camelToSnakeCase = (str: string) =>
  str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)

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

// const constructWhere = (item) => `WHERE ${field} = ${value}`
const constructWhere = (filter: any) => {
  const wheres = Object.keys(filter).map(
    key => `${camelToSnakeCase(key)} = '${filter[key]}'`
  )
  return wheres.join(' AND ')
}

const selectAllWhere = (filter: any) => {
  const where = constructWhere(filter)
  console.log('where', where)
  if (where) return `${pgSelectAllFeatures} WHERE ${where}`
  return pgSelectAllFeatures
}

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
export async function pgQuery(filter: any): Promise<any> {
  const features = await pgDb.any(selectAllWhere(filter))
  const dependencies = await pgDb.any(pgSelectAllDeps)
  // console.log(dependencies)
  console.log(`💾 [POSTGRES] ${features.length} features returned`)
  console.log(`💾 [POSTGRES] ${dependencies.length} dependencies returned`)

  const joined = joinQuerys(features, dependencies)
  return sqlRowsToFeatureGraphs(joined)
}
