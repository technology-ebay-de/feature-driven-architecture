import { DISMISS, HANDLE } from './actionTypes'

export const dismiss = () => dispatch => {
  dispatch({ type: DISMISS })
}

export const handle = err => dispatch => {
  dispatch({ type: HANDLE, payload: err })
}
