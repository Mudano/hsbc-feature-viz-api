import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.resolve(__dirname, './jira_db');

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, err => {
  if (err) return console.error(`💾 ${err.message}`);
  console.info('💾 Conneced to jira_db');
});

type FeatureGraph = {};

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
    jira_issues
  LIMIT
    10
`;

// export async function getFeatureGraphs(): Promise<FeatureGraph[]> {
// export async function getFeatureGraphs(): Promise<void> {
export function getFeatureGraphs(): void {
  db.all(selectAllFeatureGraphSQL, [], (err, rows) => {
    if (err) throw err;
    // console.log(rows)
    console.log(` Fetched ${rows.length} Feature Graphs from the db`);
    return rows;
    // rows.forEach(row => console.log(row))
  });
}

// getFeatureGraphs()
