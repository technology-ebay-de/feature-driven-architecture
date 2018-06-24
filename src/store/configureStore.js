import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import DevTools from '../lib/components/DevTools'
import { reducer as errorReducer } from '../features/error'
import { reducer as profileReducer } from '../features/profile'
import { reducer as userReducer } from '../pages/user'

const featuresReducer = combineReducers({
  error: errorReducer,
  profile: profileReducer,
})

const pagesReducer = combineReducers({
  user: userReducer,
})

const rootReducer = combineReducers({
  features: featuresReducer,
  pages: pagesReducer,
})

export default preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, createLogger()),
      DevTools.instrument()
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer)
    })
  }

  return store
}
