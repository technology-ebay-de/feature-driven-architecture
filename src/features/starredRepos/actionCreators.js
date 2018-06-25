import * as api from '../../lib/api'
import { handle as handleError } from '../../features/error'
import { LOAD, LOAD_NEXT, HANDLE_RESPONSE, HANDLE_ERROR } from './actionTypes'
import { selectStarredRepos } from './selectors'

export const load = ({ login }) => dispatch => {
  dispatch({ type: LOAD, payload: login })

  api
    .call(`users/${login}/starred`)
    .then(payload => {
      dispatch({ type: HANDLE_RESPONSE, payload })
    })
    .catch(err => {
      dispatch({ type: HANDLE_ERROR, payload: err })
      dispatch(handleError(err))
    })
}

export const loadNext = () => (dispatch, getState) => {
  dispatch({ type: LOAD_NEXT })
  api
    .call(selectStarredRepos(getState()).nextPageUrl)
    .then(payload => {
      dispatch({ type: HANDLE_RESPONSE, payload })
    })
    .catch(err => {
      dispatch({ type: HANDLE_ERROR, payload: err })
      dispatch(handleError(err))
    })
}
