import { FILE } from 'react-ui-pack'
import sharp from 'sharp'

/**
 * IMAGE HELPERS ===============================================================
 * =============================================================================
 */

/**
 * Create Resize Stream Pipeline
 * @example:
 *    file.createReadStream().pipe(resize())
 *
 * @returns {Sharp} - transform pipeline
 */
export function resize ({width = FILE.IMAGE_MAX_RES, height = null, fit = 'inside', format = 'jpeg'} = {}) {
  return sharp().resize(width, height, {fit, withoutEnlargement: true}).toFormat(format)
}