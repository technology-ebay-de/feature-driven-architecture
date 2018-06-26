import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import DevTools from '../components/DevTools'
import { reducer as errorReducer } from '../features/error'
import { reducer as profileReducer } from '../features/profile'
import { reducer as starredReposReducer } from '../features/starredRepos'

const reducer = combineReducers({
  features: combineReducers({
    error: errorReducer,
    profile: profileReducer,
    starredRepos: starredReposReducer,
  }),
  pages: {},
})

export default preloadedState => {
  const store = createStore(
    reducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, createLogger()),
      DevTools.instrument()
    )
  )

  return store
}
