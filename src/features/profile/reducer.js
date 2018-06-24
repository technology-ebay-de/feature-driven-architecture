import { LOAD, HANDLE } from './actionTypes'

const defaultState = {
  status: 'loading',
}

const states = {
  [LOAD]: () => defaultState,
  [HANDLE]: (state, user) => ({
    ...state,
    ...user,
    status: 'loaded',
  }),
}

export default (state = defaultState, { type, payload } = {}) =>
  states[type] ? states[type](state, payload) : state
