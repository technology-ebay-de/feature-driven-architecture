import * as api from '../../lib/api'
import { handle as handleError } from '../../features/error'
import { LOAD, HANDLE } from './actionTypes'

export const load = ({ login }) => dispatch => {
  dispatch({ type: LOAD, payload: login })

  api
    .fetchUser(login)
    .then(({ result }) => {
      dispatch({ type: HANDLE, payload: result })
    })
    .catch(err => {
      dispatch(handleError(err))
    })
}
