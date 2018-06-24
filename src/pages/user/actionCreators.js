import * as api from '../../lib/api'
import { handle as handleError } from '../../features/error'
import {
  LOAD,
  LOAD_MORE_STARRED,
  HANDLE_USER,
  HANDLE_STARRED,
} from './actionTypes'
import { selectUser } from './selectors'

export const load = ({ login }) => dispatch => {
  dispatch({ type: LOAD, payload: login })

  api
    .fetchStarred(login)
    .then(payload => {
      dispatch({ type: HANDLE_STARRED, payload })
    })
    .catch(err => {
      dispatch(handleError(err))
    })
}

export const loadMore = () => (dispatch, getState) => {
  dispatch({ type: LOAD_MORE_STARRED })
  api
    .call(selectUser(getState()).nextPageUrl)
    .then(payload => {
      dispatch({ type: HANDLE_STARRED, payload })
    })
    .catch(err => {
      dispatch(handleError(err))
    })
}
