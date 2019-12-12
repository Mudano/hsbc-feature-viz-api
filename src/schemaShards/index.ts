/**
 * This file merges all of the schemas that belong to different parts of the shards
 */
import featureGraph from './featureGraph'
import { mergeRawSchemas } from '../utils'

export default mergeRawSchemas(featureGraph)
