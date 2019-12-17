import { mergeWith, isArray, merge } from 'lodash'
import { IExecutableSchemaDefinition } from 'apollo-server'
import {
  Feature,
  BubbleData,
  TimelineData,
  FeatureGraphs,
  QuadData
} from './__typedefs/graphql'

const withArraysConcatination = (objValue: any, srcValue: any) => {
  // if an array, concat it
  if (isArray(objValue)) {
    return objValue.concat(srcValue)
  }
  // use the normal lodash merge functionality
}

/**
 * Given a list of schemas, join them and return one
 * SchemaDefinition
 * @param schemas
 */
export const mergeRawSchemas = (
  ...schemas: IExecutableSchemaDefinition[]
): IExecutableSchemaDefinition => {
  return mergeWith({}, ...schemas, withArraysConcatination)
}

/**
 * Given multiple queries, join them to give a Feature with its dependencies
 * @param mainQueryResult
 */
export const joinQuerys = (mainQueryResult: any): Feature => {
  return {
    id: mainQueryResult.id,
    featureName: mainQueryResult.feature_name,
    epic: mainQueryResult.epic,
    system: mainQueryResult.system,
    market: mainQueryResult.market,
    cluster: mainQueryResult.cluster,
    crossFunctionalTeam: mainQueryResult.cross_functional_team,
    pod: mainQueryResult.pod,
    agreedDependencies: mainQueryResult.agreed_dependencies,
    inferredDependencies: mainQueryResult.inferred_dependencies,
    users: mainQueryResult.users,
    dueDate: mainQueryResult.due_date,
    primaryFeature: mainQueryResult.primary,
    xCat: mainQueryResult.x_cat,
    yCat: mainQueryResult.y_cat,
    ragStatus: mainQueryResult.rag_status,
    rCat: mainQueryResult.r_cat,
    colour: mainQueryResult.colour,
    budget: mainQueryResult.budget
  }
}

/**
 * Given an Array of rows return from a sql query, return a FeatureGraphs
 * object
 *
 * TODO: this should take a list of features, that has been constructed from the function
 * that joins the results of multiples  queries together
 * @param rows
 */
export const sqlRowsToFeatureGraphs = (rows: Feature[]): FeatureGraphs => {
  return {
    features: rows.map(rowsToFeatures),
    bubbleFeatures: featuresToBubble(rows),
    quadFeatures: rows.map(rowsToQuad),
    timelineFeatures: featuresToTimeline('Bubble Viz', rows)
  }
}

/**
 * Given a row from a sql query return a Feature object
 *
 * @param feature
 */
const rowsToFeatures = (row: Feature): Feature => {
  return {
    id: row.id,
    featureName: row.featureName,
    epic: row.epic,
    system: row.system,
    market: row.market,
    cluster: row.cluster,
    crossFunctionalTeam: row.crossFunctionalTeam,
    pod: row.pod,
    // agreedDependencies: row.agreed_dependencies,
    // inferredDependencies: row.inferred_dependencies,
    agreedDependencies: [],
    inferredDependencies: [],
    users: row.users,
    dueDate: row.dueDate,
    primaryFeature: row.primaryFeature,
    xCat: row.xCat,
    yCat: row.yCat,
    ragStatus: row.ragStatus,
    rCat: row.rCat,
    colour: row.colour,
    budget: row.budget
  }
}

/**
 * Given a row from a sql query, return a QuadData object
 *
 * @param feature
 */
export const rowsToQuad = (row: Feature): QuadData => {
  console.log('rowsToQuad', row)
  return {
    id: row.id,
    xCat: row.xCat,
    yCat: row.yCat,
    ragStatus: row.ragStatus,
    rCat: row.rCat,
    featureName: row.featureName,
    primaryFeature: row.primaryFeature
  }
}

/**
 * Given a list of Features and a Feature name, return
 * TODO: this needs a big refactor. inefficnet, unclear and some hardwired data
 *
 * @param featureGraphName
 * @param featureGraphs
 */
//  export const featureGraphToTimeline: TimelineData = (
export const featuresToTimeline = (
  featureGraphName: string,
  featureGraphs: Feature[]
) => {
  const newTimelineData = featureGraphs.filter(
    e => e.featureName === featureGraphName
  )

  let agreed = newTimelineData.map((e, i) => e.agreedDependencies)
  let inferred = newTimelineData.map((e, i) => e.inferredDependencies)
  // let allDep = [...agreed[0], ...inferred[0]]

  // @ts-ignore
  let agreedDependencies = []

  // featureGraphs.length > 0 ?
  // featureGraphs.filter(e => agreed[0].includes(e.id)) :
  // []

  // @ts-ignore
  let inferredDependencies = []
  // featureGraphs.length > 0 ?
  //   featureGraphs.filter(e => inferred[0].includes(e.id)) :
  //   []

  // let agreedDependencies = featureGraphs.filter((e) => agreed[0].id === e.id)
  // let inferredDependencies = featureGraphs.filter((e) => inferred[0].id === e.id)

  // console.log(this.state.timelineData.data)

  //structure
  //featureName selected
  let newStructure = []
  //data is the array of objects
  newStructure.push({
    label: featureGraphName,
    data: [
      {
        label: 'Label 1',
        type: 'TRIANGLE',
        customClass: 'agreed',
        at: new Date('2016-05-01')
      }
    ]
  })
  //market activation??
  newStructure.push({
    label: 'Market Activation',
    data: [
      {
        label: 'Label 1',
        type: 'TRIANGLE',
        customClass: 'agreed',
        at: new Date('2016-05-15')
      }
    ]
  })
  //other dependencies
  newStructure.push({ label: 'Other Dependencies', data: [] })
  // All the dependencies
  // @ts-ignore
  agreedDependencies.forEach(el => {
    newStructure.push({
      label: el.featureName,
      data: [
        {
          label: 'Label 1',
          type: 'TRIANGLE',
          customClass: 'agreed',
          at: new Date('2016-05-30')
        }
      ]
    })
    // data structure
    // ask how will we display multiple dependencies if it overflows
    // how do we get whether a featureName is an epic / story
    //find how many epics and systems this featureName belongs to and push it to data
  })

  // @ts-ignore
  inferredDependencies.forEach(el => {
    newStructure.push({
      label: el.featureName,
      data: [
        {
          label: 'Label 1',
          type: 'POINT',
          customClass: 'inferred',
          at: new Date('2016-10-15')
        }
      ]
    })
    // data structure
  })
  console.log('timeline new structure:', newStructure)

  return newStructure
}

/**
 * Given a feature record, return the feature data in the shape
 * required by the D3 Bubble visualisation
 * @param {Feature} record
 */
export const featureGraphToBubble = (row: any) => {
  row['inferred_dependencies'] = []
  row['agreedDependencies'] = []
  return {
    node: {
      id: row.id,
      agreedDependencies: row.agreedDependencies,
      primaryFeature: row.primaryFeature,
      group: row.colour,
      size: row.budget
    },
    // @ts-ignore
    link: row.agreedDependencies.map(dep => ({
      source: row.id,
      target: dep
    }))
  }
}

/**
 * Given a list of features, return a list of feature data in the shape
 * required by the D3 Bubble visualisation
 * @param {Feature[]} features
 */
export const featuresToBubble = (features: Feature[]): BubbleData => {
  const nodes: any[] = []
  let links: any[] = []
  features.forEach(issue => {
    const { node, link } = featureGraphToBubble(issue)
    nodes.push(node)
    links = links.concat(link)
  })
  return { nodes, links }
}
