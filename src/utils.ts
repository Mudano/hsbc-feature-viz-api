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
export const joinQuerys = (features: any, dependencies: any): Feature[] => {
  return features.map((feature: any) => ({
    id: feature.id,
    featureName: feature.feature_name,
    epic: feature.epic,
    system: feature.system,
    market: feature.market,
    cluster: feature.cluster,
    crossFunctionalTeam: feature.cross_functional_team,
    pod: feature.pod,
    // this is assuming there is a dependency join table
    agreedDependencies: dependencies
      .filter((d: any) => d.source === feature.id)
      .map((d: any) => d.target),
    // agreedDependencies: ['1', '2'],
    inferredDependencies: dependencies.inferred_dependencies,
    users: feature.users,
    dueDate: feature.due_date,
    primaryFeature: feature.primary,
    xCat: feature.x_cat,
    yCat: feature.y_cat,
    ragStatus: feature.rag_status,
    rCat: feature.r_cat,
    colour: feature.colour,
    budget: feature.budget
  }))
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
    agreedDependencies: row.agreedDependencies,
    // inferredDependencies: row.inferred_dependencies,
    // agreedDependencies: [],
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
  // console.log('rowsToQuad', row)
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
// export const baseToTimeline = (value, baseData) => {
export const featuresToTimeline = (value: string, featureGraphs: Feature[]) => {
  const newTimelineData = featureGraphs.filter(e => e.featureName === value)

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

  //structure
  //feature selected
  let newStructure = []
  //data is the array of objects
  newStructure.push({
    label: value,
    data: [
      {
        label: value,
        type: 'SQUARE',
        customClass: 'g1',
        at: new Date('2016-5-1')
      },
      {
        label: value,
        type: 'POINT',
        customClass: 'r4',
        at: new Date('2016-8-5')
      },
      {
        label: value,
        type: 'SQUARE',
        customClass: 'r5',
        at: new Date('2016-10-30')
      }
    ]
  })
  //market activation??
  newStructure.push({
    label: 'Market Activation',
    data: [
      { type: 'ALPHA', at: new Date('2016-8-10'), label: 'Alpha' },
      { type: 'BETA', at: new Date('2016-8-20'), label: 'Beta' },
      { type: 'GOLIVE', at: new Date('2016-8-29'), label: 'Go Live' }
    ]
  })
  //other dependencies
  newStructure.push({ label: 'Other Dependencies', data: [] })
  //All the dependencies
  // @ts-ignore
  agreedDependencies.forEach(el => {
    newStructure.push({
      label: el.feature,
      data: [
        {
          label: el.feature,
          type: 'SQUARE',
          customClass: 'agreed',
          at: new Date('2016-5-1')
        },
        {
          label: el.feature,
          type: 'POINT',
          customClass: 'agreed',
          at: new Date('2016-6-5')
        },
        {
          label: el.feature,
          type: 'TRIANGLE',
          customClass: 'agreed',
          at: new Date('2016-7-15')
        }
      ]
    })
    // data structure
    // ask how will we display multiple dependencies if it overflows
    //how do we get whether a feature is an epic / story
    //find how many epics and systems this feature belongs to and push it to data
  })
  // @ts-ignore
  inferredDependencies.forEach(el => {
    newStructure.push({
      label: el.feature,
      data: [
        {
          label: el.feature,
          type: 'POINT',
          customClass: 'inferred',
          at: new Date('2016-7-17')
        },
        {
          label: el.feature,
          type: 'SQUARE',
          customClass: 'inferred',
          at: new Date('2016-8-18')
        },
        {
          label: el.feature,
          type: 'TRIANGLE',
          customClass: 'inferred',
          at: new Date('2016-9-1')
        }
      ]
    })
    // data structure
  })
  // console.log('timeline new structure:', newStructure)

  return newStructure
}

/**
 * Given a feature record, return the feature data in the shape
 * required by the D3 Bubble visualisation
 * @param {Feature} record
 */
export const featureGraphToBubble = (row: any) => {
  return {
    node: {
      id: row.id,
      agreedDependencies: row.agreedDependencies,
      // TODO map the correct types for bolean here
      // primaryFeature: row.primaryFeature,
      primaryFeature: 'true',
      group: '1',
      size: '3'
      // group: row.colour,
      // size: row.budget
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
