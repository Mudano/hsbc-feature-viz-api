import {
  mergeRawSchemas,
  joinQuerys,
  sqlRowsToFeatureGraphs,
  rowsToQuad,
  featuresToTimeline,
  featuresToBubble,
  filters,
  filterDependencies
} from './utils'

const rawRowsFromSql = [
  {
    id: '1',
    feature_name: 'Bubble Viz',
    due_date: '2019-03-12'
  }
]

const expectedFeatures = [
  {
    id: '1',
    featureName: 'Bubble Viz',
    epic: null,
    system: null,
    market: null,
    cluster: null,
    crossFunctionalTeam: null,
    pod: null,
    agreedDependencies: [2, 4, 3],
    inferredDependencies: [],
    users: [],
    dueDate: '2019-03-12',
    primaryFeature: true,
    xCat: null,
    yCat: null,
    ragStatus: null,
    rCat: null,
    group: null,
    size: null
  }
]

const expectedBubbleFeatures = {
  nodes: [
    {
      id: '1',
      feature_name: 'Bubble Viz',
      due_date: '2019-03-12',
      agreedDependencies: [2, 4, 3],
      primaryFeature: true,
      group: 1,
      size: 3
    }
  ],
  links: [
    { source: 1, target: 2 },
    { source: 1, target: 4 },
    { source: 1, target: 3 }
  ]
}

const expectedQuadFeatures: any = [
  {
    id: '1',
    xCat: null,
    yCat: null,
    ragStatus: null,
    rCat: null,
    featureName: 'Bubble Viz',
    primaryFeature: true
  }
]
const expectedTimelineFeatures: any = []

// describe('utils', () => {
it('joinQuerys returns the correct Feature[]', () => {
  const dependencies: any = [
    { source: 1, target: 2, id: 1 },
    { source: 1, target: 4, id: 1 },
    { source: 1, target: 3, id: 1 }
  ]
  const actual = joinQuerys(rawRowsFromSql, dependencies)
  expect(actual).toEqual(expectedFeatures)
})
it('sqlRowsToFeatureGraphs returns a FeatureGraphs object', () => {
  const expected = {
    features: expectedFeatures,
    bubbleFeatures: expectedBubbleFeatures,
    quadFeatures: expectedQuadFeatures,
    timelineFeatures: expectedTimelineFeatures
  }
  expect(sqlRowsToFeatureGraphs(expectedFeatures)).toEqual(expected)
})
// })
