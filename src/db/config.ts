require('dotenv').config()

/**
 * DB2 CONNECTOR
 */
import * as ibmdb from 'ibm_db'
export const db2Pool = require('ibm_db').Pool // For connection pooling

export const db2ConnectionString = (function() {
  return `
    DATABASE=${process.env['DB2_DATABASE']};
    UID=${process.env['DB2_USER']};
    PWD=${process.env['DB2_PASSWORD']};
    HOSTNAME=${process.env['DB2_HOSTNAME']};
    PORT=${process.env['DB2_PORT']};
    PROTOCOL=${process.env['DB2_PROTOCOL'] || 'TCPIP'}
  `.replace(/\s/g, '')
})()

console.log('💾 [DB2] connection string', db2ConnectionString)

ibmdb.open(db2ConnectionString, function(err, conn) {
  if (err) return console.error(`💾 [DB2] connection error:`, err)

  const query = `SELECT * FROM JIRA.ISSUES_STG LIMIT 10;`

  conn.query(query, function(err, data) {
    if (err) console.error(`💾 [DB2] query error ${err}`)
    console.log(data)

    conn.close(() => console.log('done'))
  })
})

/**
 * SQLITE CONNECTOR
 */
import sqlite from 'sqlite'
import promise from 'bluebird'
import path from 'path'

const sqliteDbPath = path.resolve(
  __dirname,
  `./${process.env['SQLITE_DB_NAME']}`
)
// @ts-ignore
export const sqliteDb = sqlite.open(sqliteDbPath, { Promise: promise })

/**
 * POSTGRES CONNECTOR
 */
import {
  // Pool,
  PoolConfig
} from 'pg'
/**
 * pg-prmoise setup
 * adapted from https://github.com/vitaly-t/pg-promise/blob/master/examples/monitor.js
 */
import * as monitor from 'pg-monitor'

const pgPromiseConfig: PoolConfig = {
  user: process.env['POSTGRES_USER'],
  host: process.env['POSTGRES_HOST'],
  database: process.env['POSTGRES_DB'],
  password: process.env['POSTGRES_PASSWORD'],
  port: parseInt(process.env['POSTGRES_PORT'] || '5432')
}

// instantiate the PostgreSQL connection pool
// const pool = new Pool(pgPromiseConfig)

// overriding the default (ES6 Promise)
const initOptions = {
  promiseLib: promise
}

const pgp = require('pg-promise')(initOptions)

// attach to all query events
monitor.attach(initOptions)

// change the default theme
monitor.setTheme('invertedMonochrome')

// database instance
export const pgDb = pgp(pgPromiseConfig)
