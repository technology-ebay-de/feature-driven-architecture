import * as api from '../../lib/api'
import { handle as handleError } from '../../features/error'
import { LOAD, LOAD_MORE, HANDLE } from './actionTypes'
import { selectStarredRepos } from './selectors'

export const load = ({ login }) => dispatch => {
  dispatch({ type: LOAD, payload: login })

  api
    .fetchStarred(login)
    .then(payload => {
      dispatch({ type: HANDLE, payload })
    })
    .catch(err => {
      dispatch(handleError(err))
    })
}

export const loadMore = () => (dispatch, getState) => {
  dispatch({ type: LOAD_MORE })
  api
    .call(selectStarredRepos(getState()).nextPageUrl)
    .then(payload => {
      dispatch({ type: HANDLE, payload })
    })
    .catch(err => {
      dispatch(handleError(err))
    })
}
