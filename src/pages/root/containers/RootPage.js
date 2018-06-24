import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Search } from '../../../features/search'
import { Error } from '../../../features/error'

const RootPage = ({ search, location, history, children }) => (
  <Fragment>
    <Search
      value={location.pathname.substr(1)}
      onSearch={({ value }) => {
        history.push(`/${value}`)
      }}
    />
    <Error />
    {children}
  </Fragment>
)

export default connect()(RootPage)
