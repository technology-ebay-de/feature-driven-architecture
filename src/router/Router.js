import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'
import DevTools from '../lib/components/DevTools'
import { Root } from '../pages/root'
import { User } from '../pages/user'

const Router = () => (
  <BrowserRouter>
    <div>
      <Route path="/" component={Root} />
      <Route path="/:login" component={User} />
      <DevTools />
    </div>
  </BrowserRouter>
)
//<Route path="/:login/:name" component={RepoPage} />

export default Router
