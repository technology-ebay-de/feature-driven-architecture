import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Search } from '../../../features/search'
import { Error } from '../../../features/error'

const Root = ({ search, location, history, children }) => (
  <Fragment>
    <Search
      value={location.pathname.substr(1)}
      onSearch={({ value }) => {
        history.push(`/${value}`)
      }}
    />
    <hr />
    <Error />
    {children}
  </Fragment>
)

export default connect()(Root)
