import * as api from '../../lib/api'
import { handle as handleError } from '../../features/error'
import { LOAD, HANDLE_RESPONSE, HANDLE_ERROR } from './actionTypes'

export const load = ({ login }) => dispatch => {
  dispatch({ type: LOAD, payload: login })

  api
    .call(`users/${login}`)
    .then(({ result }) => {
      dispatch({ type: HANDLE_RESPONSE, payload: result })
    })
    .catch(err => {
      dispatch({ type: HANDLE_ERROR, payload: err })
      dispatch(handleError(err))
    })
}
