import { localise } from 'utils-pack'
import * as definitions from './definitions'

/**
 * GLOBAL VARIABLES ============================================================
 * =============================================================================
 */

export * from './_envs'
export { default as configs } from './configs'
export * from './configs'
export * from './defaults'
export * from './definitions'
// export * from './fields'
// export * from './files'
export * from './routes'
// export * from './translations'
export * from './urls'
// export * from './validations'

/* Platform Prefixes */
export const SERVER = 'SERVER'

localise(definitions)
