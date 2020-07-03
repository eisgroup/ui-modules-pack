import { bench } from 'utils-pack'
import mockStore from './__mock__/store'

/**
 * BENCHMARK TESTS =============================================================
 * =============================================================================
 */

export const state = mockStore.getState()
export default state

/**
 * SELECTORS -------------------------------------------------------------------
 * -----------------------------------------------------------------------------
 */
bench({type: 'selector', log: ''}, () => {}, state)

/**
 * QUERIES ---------------------------------------------------------------------
 * -----------------------------------------------------------------------------
 */
