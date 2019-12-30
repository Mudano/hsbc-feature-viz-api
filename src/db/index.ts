import { pgDb, sqliteDb } from './config'
import { db2ConnectionString, db2Pool } from './config'
import { Feature } from '../__typedefs/graphql'
import {
  sqlRowsToFeatureGraphs,
  joinQuerys,
  filters,
  filterDependencies
} from '../utils'

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

const selectAllWhere = (filter?: any) => {
  if (!filter) return pgSelectAllFeatures
  const where = constructWhere(filter)
  console.log('where', where)
  return `${pgSelectAllFeatures} WHERE ${where}`
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
  console.log('in pgQuery')
  console.log('filter', filter)
  const allRaw = await pgDb.any(pgSelectAllFeatures)
  const filteredFeatures = await pgDb.any(selectAllWhere(filter))
  const agreedDependencies = await pgDb.any(pgSelectAllDeps)

  // console.log(agreedDependencies)
  console.log(`💾 [POSTGRES] ${allRaw.length} allRaw returned`)
  console.log(
    `💾 [POSTGRES] ${filteredFeatures.length} filteredFeatures returned`
  )
  console.log(
    `💾 [POSTGRES] ${agreedDependencies.length} agreedDependencies returned`
  )

  // join various queries together
  const joined = joinQuerys(filteredFeatures, agreedDependencies)

  // only filterDependencies there is a filter present
  if (!filter) return sqlRowsToFeatureGraphs(joined)
  const all = joinQuerys(allRaw)
  const dependencies = filterDependencies(all, joined)
  return sqlRowsToFeatureGraphs(joined.concat(dependencies))
}
