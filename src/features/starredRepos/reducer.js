import pick from 'lodash/pick'
import { LOAD, HANDLE, LOAD_NEXT } from './actionTypes'

const defaultState = {
  starred: [],
  status: 'loading',
}

const states = {
  [LOAD]: () => defaultState,
  [HANDLE]: (state, { result, ...rest }) => ({
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
  [LOAD_NEXT]: state => ({
    ...state,
    status: 'loading',
  }),
}

export default (state = defaultState, { type, payload } = {}) =>
  states[type] ? states[type](state, payload) : state
