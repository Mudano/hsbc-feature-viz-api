import { mergeWith, isArray, merge } from 'lodash'
import { IExecutableSchemaDefinition } from 'apollo-server'
import { FeatureGraph, BubbleData } from './__typedefs/graphql'

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

// TODO: move baseToBubble here
// TODO: move baseToTimeline here
export const featureGraphToTimeline = (
  featureGraphName: string,
  featureGraphs: FeatureGraph[]
) => {
  let newTimelineData = featureGraphs

  newTimelineData = featureGraphs.filter(
    e => e.featureName === featureGraphName
  )
  let agreed = newTimelineData.map((e, i) => e.agreedDependencies)
  let inferred = newTimelineData.map((e, i) => e.inferredDependencies)
  // let allDep = [...agreed[0], ...inferred[0]]

  // @ts-ignore
  let agreedDependencies = featureGraphs.filter(e => agreed[0].includes(e.id))
  // @ts-ignore
  let inferredDependencies = featureGraphs.filter(e =>
    inferred[0].includes(e.id)
  )
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
  //All the dependencies
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
  console.log(newStructure)

  return newStructure
}

/**
 * Given a feature record, return the feature data in the shape
 * required by the D3 Bubble visualisation
 * @param {Feature} record
 */
export const featureGraphToBubble = (record: FeatureGraph) => {
  return {
    node: {
      ...record,
      group: 1, // colours
      size: 3
    },
    // @ts-ignore
    link: record.agreedDependencies.map(dep => ({
      source: record.id,
      target: dep
    }))
  }
}

/**
 * Given a list of features, return a list of feature data in the shape
 * required by the D3 Bubble visualisation
 * @param {Feature[]} featureGraphs
 */
export const featureGraphListToBubble = (
  featureGraphs: FeatureGraph[]
): BubbleData => {
  const nodes: any[] = []
  let links: any[] = []
  featureGraphs.forEach(issue => {
    const { node, link } = featureGraphToBubble(issue)
    nodes.push(node)
    links = links.concat(link)
  })
  return { nodes, links }
}
