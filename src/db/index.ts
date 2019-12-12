import { Pool, PoolConfig } from 'pg'
// instantiate the PostgreSQL connection pool

require('dotenv')

const pgPromiseConfig: PoolConfig = {
  // user: process.env["POSTGRES_USER"],
  // host: process.env["POSTGRES_HOST"],
  // port: process.env["POSTGRES_DB"],
  // database: process.env["POSTGRES_PASSWORD"],
  // password: process.env["POSTGRES_PORT"],
  user: 'lsalmins',
  host: 'nonprod-dsol-prototyping-db.ctolc6xouppg.eu-west-1.rds.amazonaws.com',
  port: 5432,
  database: 'dev',
  password: 'k4GL$o4MK#X4x@JR@*m7'
}
const pool = new Pool(pgPromiseConfig)

/**
 * pg-prmoise setup
 * adapted from https://github.com/vitaly-t/pg-promise/blob/master/examples/monitor.js
 */
import promise from 'bluebird' // or any other Promise/A+ compatible library
import * as monitor from 'pg-monitor'

const initOptions = {
  promiseLib: promise // overriding the default (ES6 Promise)
}

const pgp = require('pg-promise')(initOptions)

monitor.attach(initOptions) // attach to all query events

// monitor.setTheme(myTheme); // selecting your own theme;
monitor.setTheme('invertedMonochrome') // change the default theme

const db = pgp(pgPromiseConfig) // database instance

type FeatureGraph = {}

// Test DB tables
// jira_issues
// jira_assignee_projects
// jira_dependencies
// jira_issues_with_dep
// jira_project_dependencies

const selectAllFeatureGraphSQL = `
  SELECT
    *
  FROM
    prototyping.jira_issues
  LIMIT
    10
`

export async function getFeatureGraphs(): Promise<any> {
  const jiraIssues = await db.any(selectAllFeatureGraphSQL)
  console.log(jiraIssues)
  return jiraIssues
}
