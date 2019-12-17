require('dotenv').config()

/**
 * DB2 CONNECTOR
 */
import * as ibmdb from 'ibm_db'
// const ibmdb = require('ibm_db')		//For connecting to DB
// const db2Pool = require("ibm_db").Pool 	// For connection pooling
// const async = require('async')

const db2ConnectionString = (function() {
  return `
    DATABASE=${process.env['DB2_DATABASE']}
    UID=${process.env['DB2_USER']}
    PWD=${process.env['DB2_PASSWORD']}
    HOSTNAME=${process.env['DB2_HOSTNAME']}
    PORT=${process.env['DB2_PORT']}
    PROTOCOL=${process.env['DB2_PROTOCOL'] || 'TCPIP'}
  `.replace(/\s/g, '')
})()

console.log('db2ConnectionString', db2ConnectionString)

ibmdb.open(db2ConnectionString, function(err, conn) {
  if (err) return console.error(`💾 [DB2]`, err)

  conn.query('select 1 from sysibm.sysdummy1', function(err, data) {
    if (err) console.error(`💾 [DB2] ${err}`)
    console.log(data)

    conn.close(function() {
      console.log('done')
    })
  })
})

/**
 * SQLITE CONNECTOR
 */
import sqlite3 from 'sqlite3'
import path from 'path'

const dbPath = path.resolve(__dirname, `./${process.env['SQLITE_DB_NAME']}`)

export const sqliteDb = new sqlite3.Database(
  dbPath,
  sqlite3.OPEN_READONLY,
  err => {
    if (err) return console.error(`💾 ${err.message}`)
    console.info('💾 [Sqlite3] Conneced to jira_db')
  }
)

/**
 * POSTGRES CONNECTOR
 */
import { Pool, PoolConfig } from 'pg'
/**
 * pg-prmoise setup
 * adapted from https://github.com/vitaly-t/pg-promise/blob/master/examples/monitor.js
 */
import promise from 'bluebird' // or any other Promise/A+ compatible library
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

// monitor.setTheme(myTheme) // selecting your own theme
// change the default theme
monitor.setTheme('invertedMonochrome')

// database instance
export const pgDb = pgp(pgPromiseConfig)
