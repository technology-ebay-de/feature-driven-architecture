import { LOAD, HANDLE_RESPONSE, HANDLE_ERROR } from './actionTypes'

const defaultState = {
  status: 'initial',
}

const states = {
  [LOAD]: state => ({
    ...state,
    status: 'loading',
  }),
  [HANDLE_RESPONSE]: (state, user) => ({
    ...state,
    ...user,
    status: 'loaded',
  }),
  [HANDLE_ERROR]: state => ({
    ...defaultState,
    status: 'error',
  }),
}

export default (state = defaultState, { type, payload } = {}) =>
  states[type] ? states[type](state, payload) : state
