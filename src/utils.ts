import { mergeWith, isArray, merge } from 'lodash'
import { IExecutableSchemaDefinition } from 'apollo-server'

function withArraysConcatination(objValue: any, srcValue: any) {
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
