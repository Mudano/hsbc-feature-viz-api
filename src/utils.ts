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
 * Given an empty value, or undefined, return null. Return the value if
 * not empty
 * @param value
 */
export const emptyToNull = (value: any) => {
  if (value === undefined || value === null) return null
  if (typeof value === 'string' && (value === '' || value.trim() === ''))
    return null
  return value
}

/**
 * Given a null value, return an empty array. Return the value if not
 * null
 * @param value
 */
export const nullToEmptyArray = (value: any) => {
  if (value === undefined || value === null) return []
  return value
}

const parseDependencies = (dependencies: any, feature: Feature) => {
  return (
    dependencies
      // double equals - comparing 2 strings
      .filter((d: any) => d.source == feature.id)
      .map((d: any) => parseInt(d.target))
  )
}

/**
 * Given multiple queries, join them to give a Feature with its dependencies
 * @param mainQueryResult
 */
export const joinQuerys = (features: any, ag?: any): Feature[] => {
  return features.map((feature: any) => ({
    id: emptyToNull(feature.id),
    featureName: emptyToNull(feature.feature_name),
    epic: emptyToNull(feature.epic),
    system: emptyToNull(feature.system),
    market: emptyToNull(feature.market),
    cluster: emptyToNull(feature.cluster),
    crossFunctionalTeam: emptyToNull(feature.cross_functional_team),
    pod: emptyToNull(feature.pod),
    // this is assuming there is a dependency join table
    agreedDependencies: parseDependencies(nullToEmptyArray(ag), feature),
    inferredDependencies: nullToEmptyArray([]),
    users: nullToEmptyArray([]),
    dueDate: emptyToNull(feature.due_date),
    primaryFeature: true,
    xCat: emptyToNull(feature.x_cat),
    yCat: emptyToNull(feature.y_cat),
    ragStatus: emptyToNull(feature.rag_status),
    rCat: emptyToNull(feature.r_cat),
    group: emptyToNull(feature.group),
    size: emptyToNull(feature.size)
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

const POINT = 'POINT'
const SQUARE = 'SQUARE'
const TRIANGLE = 'POINT'
const AGREED = 'agreed'
const INFERRED = 'inferred'

const shapeMap = {
  feature: POINT,
  epic: SQUARE,
  story: TRIANGLE
}

/**
 * Given a list of Features and a Feature name, return a TimelineData object
 *
 * TODO: does this mean that timeline needs it's own endpoint?
 * TODO: halfway through refactor
 */
export const featuresToTimeline = (
  value: string,
  features: Feature[]
): TimelineData => {
  const highlightedFeature = features.find(
    ({ featureName }) => featureName === value
  )
  // @ts-ignore
  const agreed = highlightedFeature.agreedDependencies
  // @ts-ignore
  const inferred: any = highlightedFeature.inferredDependencies
  const agreedDependencies = features.filter(e =>
    // @ts-ignore
    agreed.includes(parseInt(e.id))
  )
  const inferredDependencies = features.filter(e =>
    // @ts-ignore
    inferred.includes(parseInt(e.id))
  )

  const timelineAgreedDeps = agreedDependencies
    .map(feature => [
      {
        label: feature.featureName,
        type: SQUARE,
        customClass: AGREED,
        at: feature.dueDate
      },
      {
        label: feature.featureName,
        type: POINT,
        customClass: AGREED,
        at: feature.dueDate
      },
      {
        label: feature.featureName,
        type: TRIANGLE,
        customClass: AGREED,
        at: feature.dueDate
      }
    ])
    .flat()

  const timelineInferredDeps = inferredDependencies
    .map(feature => [
      {
        label: feature.featureName,
        type: SQUARE,
        customClass: INFERRED,
        at: feature.dueDate
      },
      {
        label: feature.featureName,
        type: POINT,
        customClass: INFERRED,
        at: feature.dueDate
      },
      {
        label: feature.featureName,
        type: TRIANGLE,
        customClass: INFERRED,
        at: feature.dueDate
      }
    ])
    .flat()

  return {
    highlightedFeature: {
      label: value,
      // TODO: in the dummy data, the square, point
      data: [
        {
          label: value,
          type: 'SQUARE',
          customClass: 'g1',
          // @ts-ignore
          at: highlightedFeature.dueDate
        },
        {
          label: value,
          type: 'POINT',
          customClass: 'r4',
          // @ts-ignore
          at: highlightedFeature.dueDate
        },
        {
          label: value,
          type: 'SQUARE',
          customClass: 'r5',
          // @ts-ignore
          at: highlightedFeature.dueDate
        }
      ]
    },
    marketActivation: [
      // @ts-ignore
      { type: 'ALPHA', at: highlightedFeature.dueDate.alpha, label: 'Alpha' },
      // @ts-ignore
      { type: 'BETA', at: highlightedFeature.dueDate.beta, label: 'Beta' },
      {
        type: 'GOLIVE',
        // @ts-ignore
        at: highlightedFeature.dueDate.goLive,
        label: 'Go Live'
      }
    ],
    dependencies: timelineAgreedDeps.concat(timelineInferredDeps)
  }
}

/**
 * Given a feature record, return the feature data in the shape
 * required by the D3 Bubble visualisation
 * @param {Feature} record
 */
export const featureToBubble = (row: any) => {
  return {
    node: {
      id: row.id,
      agreedDependencies: row.agreedDependencies,
      primaryFeature: row.primaryFeature,
      group: 1,
      size: 3
      // group: row.colour,
      // size: row.budget
    },
    // @ts-ignore
    link: row.agreedDependencies.map(dep => ({
      source: parseInt(row.id),
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
    const { node, link } = featureToBubble(issue)
    nodes.push(node)
    links = links.concat(link)
  })
  return { nodes, links }
}

/**
 * Return a Filtering object
 */
export const filters = () => {
  return {
    epic: [],
    system: [],
    user: [],
    feature: {
      name: 'feature',
      label: 'Feature',
      options: [
        'Quad Viz',
        'Filters',
        'Inferred Dependencies',
        'Timeline Viz',
        'Side Bars',
        'Authorisation',
        'Login',
        'GraphQL API',
        'Navigation',
        'Bubble Viz',
        'Tableau Dashboards'
      ]
    },
    market: {
      name: 'market',
      label: 'Market',
      options: ['AUS', 'DE', 'FR', 'UK', 'USA']
    },
    cluster: {
      name: 'cluster',
      label: 'Cluster',
      options: []
    },
    crossFunctionalTeam: {
      name: 'crossFunctionalTeam',
      label: 'Cross Functional Team',
      options: []
    },
    pod: {
      name: 'pod',
      label: 'Pod',
      options: ['Data Science', 'Engineering', 'Viz']
    },
    ragStatus: {
      name: 'ragStatus',
      label: 'Rag status',
      options: ['A2', 'A3', 'G1', 'R4', 'R5']
    }
  }
}

/**
 * Given a list of Features, return a list of their dependencies,
 * with primaryFeature set to false, for dimming of opacity in
 * FeatureGraphs
 */
export const filterDependencies = (
  allFeatures: Feature[],
  filtered: Feature[]
) => {
  return (
    filtered
      .map(record => record.agreedDependencies)
      .flat()
      // // return unique items
      .filter((x, i, a) => a.indexOf(x) === i)
      .map(id => allFeatures.filter(item => item.id == id))
      .flat()
      .map(item => ({ ...item, agreedDependencies: [], primaryFeature: false }))
  )
}
