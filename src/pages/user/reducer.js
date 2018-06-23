import pick from 'lodash/pick'
import { HANDLE_USER, HANDLE_STARRED, LOAD_MORE_STARRED } from './actionTypes'

const defaultState = {
  starred: [],
}

const states = {
  [HANDLE_USER]: (state, user) => ({
    ...state,
    user,
  }),
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
