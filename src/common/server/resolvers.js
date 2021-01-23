import { GraphQLScalarType } from 'graphql'
import JSON from 'graphql-type-json'
import { Kind } from 'graphql/language'
import { gqlDynamicObjType, gqlEnumType, gqlTagLevelType, Response } from 'modules-pack/utils/server/resolver'
import { PERMISSION, PHONE } from 'modules-pack/variables'
import { isPhoneNumber, LANGUAGE, LANGUAGE_LEVEL } from 'utils-pack'
import { toRgbaColor } from 'utils-pack/color'
import { toTimestamp } from 'utils-pack/time'
import { isGoodPassword, isId } from 'utils-pack/utility'
import isEmail from 'validator/lib/isEmail'

/**
 * COMMON TYPE RESOLVERS =======================================================
 * =============================================================================
 */

export const Id = new GraphQLScalarType({
  name: 'Id',
  description: 'Case-Sensitive ID based on Timestamp that can be generated by frontend',
  serialize: value => value,  // value sent to the client
  parseValue (value) {return this._fromClient(value)},
  parseLiteral (ast) {return this._fromClient(ast.value)},
})
Id._fromClient = function (value) {
  if (isId(value)) return value
  throw Response.badRequest(`Invalid ${this.name} ${value}, must be a valid Case-Sensitive ID based on Timestamp`)
}

export const Timestamp = new GraphQLScalarType({
  name: 'Timestamp',
  description: 'Unix timestamp in `milliseconds`',
  serialize: toTimestamp,  // value sent to the client
  parseValue: toTimestamp,  // value from the client (as variables' interpolation)
  parseLiteral (ast) {  // value from the client (as inline arguments)
    if (ast.kind === Kind.INT || ast.kind === Kind.STRING) {
      return toTimestamp(ast.value) // ast.value is always in string format
    }
    throw Response.badRequest(`Invalid Timestamp input ${ast.value}, must be numeric string or number`)
  }
})

export const Email = new GraphQLScalarType({
  name: 'Email',
  description: 'Email address',
  serialize: value => value,  // value sent to the client
  parseValue (value) {return this._fromClient(value)},
  parseLiteral (ast) {return this._fromClient(ast.value)},
})
Email._fromClient = function (value) {
  if (isEmail(value)) return value
  throw Response.badRequest(`Invalid ${this.name} ${value}, must be a valid email address`)
}

export const Password = new GraphQLScalarType({
  name: 'Password',
  description: 'Pass phrase with minimum strength requirements to ensure User has strong password',
  serialize () {throw Response.badRequest(`${this.name} should not leak!`)},  // (never show password)
  parseValue (value) {return this._fromClient(value)},
  parseLiteral (ast) {return this._fromClient(ast.value)},
})
Password._fromClient = function (value) {
  if (isGoodPassword(String(value))) return String(value)
  throw Response.badRequest(`${this.name} is too weak`)
}

export const Permissions = gqlDynamicObjType('Permissions', PERMISSION, Boolean)

export const Phones = gqlDynamicObjType('Phones', PHONE, String, {validate: isPhoneNumber})

export const LanguageCode = gqlEnumType('LanguageCode', LANGUAGE)
export const LanguageLevel = gqlTagLevelType('LanguageLevel', LANGUAGE, LANGUAGE_LEVEL)
export const LanguageLevelRange = gqlTagLevelType('LanguageLevelRange', LANGUAGE, LANGUAGE_LEVEL, {range: true})

const Color = new GraphQLScalarType({
  name: 'Color',
  description: 'RGB(A) color code. Example input: String `"150,190,220"` or Array `[150,190,220,0.87]`',
  serialize: (value) => value,  // value sent to the client
  parseValue (value) {return this._fromClient(value)},
  parseLiteral (ast) {return this._fromClient(ast.value)},
})
Color._fromClient = function (value) {
  const color = toRgbaColor(value)
  if (color) return color
  throw Response.badRequest(`Invalid ${this.name} ${value}, must be an RGB(A) array of numbers`)
}

export default {
  Id,
  Timestamp,
  Email,
  Password,
  Permissions,
  Phones,
  LanguageCode,
  LanguageLevel,
  LanguageLevelRange,
  Color,
  JSON,
  Query: {
    cursor: (_, __, {res}) => {
      return res.cursor || {}
    }
  }
}
