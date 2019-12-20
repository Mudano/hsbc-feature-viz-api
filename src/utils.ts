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
export const joinQuerys = (features: any, agreed_deps: any): Feature[] => {
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
    agreedDependencies: agreed_deps
      .filter((d: any) => d.source === feature.id)
      .map((d: any) => parseInt(d.target)),
    // agreedDependencies: ['1', '2'],
    inferredDependencies: agreed_deps.inferred_dependencies,
    users: feature.users,
    dueDate: feature.due_date,
    primaryFeature: true,
    xCat: feature.x_cat,
    yCat: feature.y_cat,
    ragStatus: feature.rag_status,
    rCat: feature.r_cat,
    group: feature.group,
    size: feature.size
  }))
}

/**
 * Given an Array of Features, return a FeatureGraphs object
 *
 * @param rows
 */
export const sqlRowsToFeatureGraphs = (rows: Feature[]): FeatureGraphs => {
  return {
    features: rows,
    bubbleFeatures: featuresToBubble(rows),
    quadFeatures: rows.map(rowsToQuad),
    // TODO: currently hardcoded to start on `Bubble Viz` - need decision as to what to show initially
    // or just to show empty state?
    timelineFeatures: featuresToTimeline('Bubble Viz', rows)
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
 * TODO: REFACTOR
 * TODO: The shape of the data probably needs to change
 *  suggested new data structure:
 *  {
 *    highlightedFeature: [
 *
 *    ],
 *    marketActivation: [
 *
 *    ],
 *    dependencies: [
 *
 *    ]
 *  }
 *
 * TODO: This is currently hardcoded - it needs to be made dynamic
 * MDs questions:
 *    - how will multiple dependencies be shown if the list extends past the height of the page?
 *    - what will indicate if a feature is an epic or a story?
 *    -
 */
//  export const featuresToTimeline = (value: string, features: Feature[]): TimelineData => {
export const featuresToTimeline = (value: string, features: Feature[]) => {
  const newTimelineData = features.filter(e => e.featureName === value)

  const agreed = newTimelineData.map(e => e.agreedDependencies)
  const inferred: any = [[7, 5, 3]]

  console.log('agreed:', agreed)

  // @ts-ignore
  const agreedDependencies = features.filter(e => agreed[0].includes(e.id))

  // @ts-ignore
  const inferredDependencies = features.filter(e => inferred[0].includes(e.id))

  let newStructure = []

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
  // market activation??
  newStructure.push({
    label: 'Market Activation',
    data: [
      { type: 'ALPHA', at: new Date('2016-8-10'), label: 'Alpha' },
      { type: 'BETA', at: new Date('2016-8-20'), label: 'Beta' },
      { type: 'GOLIVE', at: new Date('2016-8-29'), label: 'Go Live' }
    ]
  })
  // other dependencies
  newStructure.push({ label: 'Other Dependencies', data: [] })
  // All the dependencies
  // @ts-ignore
  agreedDependencies.forEach(el => {
    newStructure.push({
      label: el.featureName,
      data: [
        {
          label: el.featureName,
          type: 'SQUARE',
          customClass: 'agreed',
          at: new Date('2016-5-1')
        },
        {
          label: el.featureName,
          type: 'POINT',
          customClass: 'agreed',
          at: new Date('2016-6-5')
        },
        {
          label: el.featureName,
          type: 'TRIANGLE',
          customClass: 'agreed',
          at: new Date('2016-7-15')
        }
      ]
    })
  })
  // @ts-ignore
  inferredDependencies.forEach(el => {
    newStructure.push({
      label: el.featureName,
      data: [
        {
          label: el.featureName,
          type: 'POINT',
          customClass: 'inferred',
          at: new Date('2016-7-17')
        },
        {
          label: el.featureName,
          type: 'SQUARE',
          customClass: 'inferred',
          at: new Date('2016-8-18')
        },
        {
          label: el.featureName,
          type: 'TRIANGLE',
          customClass: 'inferred',
          at: new Date('2016-9-1')
        }
      ]
    })
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
      primaryFeature: true,
      group: 1,
      size: 3
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
