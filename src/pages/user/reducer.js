import pick from 'lodash/pick'
import { LOAD, HANDLE_STARRED, LOAD_MORE_STARRED } from './actionTypes'

const defaultState = {
  starred: [],
  isFetchingMoreStarred: false,
}

const states = {
  [LOAD]: () => defaultState,
  [HANDLE_STARRED]: (state, { result, ...rest }) => ({
    ...state,
    ...rest,
    isFetchingMoreStarred: false,
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
  [LOAD_MORE_STARRED]: state => ({
    ...state,
    isFetchingMoreStarred: true,
  }),
}

export default (state = defaultState, { type, payload } = {}) =>
  states[type] ? states[type](state, payload) : state
