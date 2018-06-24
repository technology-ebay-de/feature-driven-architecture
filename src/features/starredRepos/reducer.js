import pick from 'lodash/pick'
import { LOAD, HANDLE, LOAD_MORE } from './actionTypes'

const defaultState = {
  starred: [],
  isLoading: false,
}

const states = {
  [LOAD]: () => defaultState,
  [HANDLE]: (state, { result, ...rest }) => ({
    ...state,
    ...rest,
    isLoading: false,
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
  [LOAD_MORE]: state => ({
    ...state,
    isLoading: true,
  }),
}

export default (state = defaultState, { type, payload } = {}) =>
  states[type] ? states[type](state, payload) : state
