import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'
import DevTools from '../lib/components/DevTools'
import { RootPage } from '../pages/root'
import { UserPage } from '../pages/user'

const Router = () => (
  <BrowserRouter>
    <div>
      <Route path="/" component={RootPage} />
      <Route path="/:login" component={UserPage} />
      <DevTools />
    </div>
  </BrowserRouter>
)
//<Route path="/:login/:name" component={RepoPage} />

export default Router
