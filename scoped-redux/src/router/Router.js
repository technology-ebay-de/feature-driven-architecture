import React, { Fragment } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { RootPage } from '../pages/root'
import { UserPage } from '../pages/user'
import { RepoPage } from '../pages/repo'

const Router = () => (
  <BrowserRouter>
    <Fragment>
      <Route path="/" component={RootPage} />
      <Route path="/:login" exact component={UserPage} />
      <Route path="/:login/:repo" exact component={RepoPage} />
    </Fragment>
  </BrowserRouter>
)

export default Router
