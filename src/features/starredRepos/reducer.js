import pick from 'lodash/pick'
import { LOAD, HANDLE_RESPONSE, HANDLE_ERROR, LOAD_NEXT } from './actionTypes'

const defaultState = {
  starred: [],
  status: 'initial',
}

const states = {
  [LOAD]: state => ({
    ...state,
    status: 'loading',
  }),
  [HANDLE_RESPONSE]: (state, { result, ...rest }) => ({
    ...state,
    ...rest,
    status: 'loaded',
    starred: [
      ...state.starred,
      ...result.map(data => ({
        repo: pick(data, 'name', 'fullName', 'description'),
        owner: {
          login: data.owner.login,
        },
      })),
    ],
  }),
  [HANDLE_ERROR]: state => ({
    ...defaultState,
    status: 'error',
  }),
  [LOAD_NEXT]: state => ({
    ...state,
    status: 'loading',
  }),
}

export default (state = defaultState, { type, payload } = {}) =>
  states[type] ? states[type](state, payload) : state
