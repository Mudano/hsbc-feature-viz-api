/**
 * This file merges all of the schemas that belong to different parts of the
 *
 * Currently there is only one Schema `featureGraph`, so the merging is redundant,
 * however, it allows extensibility for more types in the future
 */
import featureGraph from './featureGraph'
import { mergeRawSchemas } from '../utils'

export default mergeRawSchemas(featureGraph)
