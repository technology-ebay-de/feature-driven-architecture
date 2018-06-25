import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Search } from '../../../features/search'
import { Error, dismiss as dismissError } from '../../../features/error'

class RootPageContainer extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.props.onChangeLocation()
    }
  }

  render() {
    const { location, history } = this.props
    return (
      <Fragment>
        <Search
          value={location.pathname.substr(1)}
          onSearch={({ value }) => {
            history.push(`/${value}`)
          }}
        />
        <Error />
      </Fragment>
    )
  }
}

export default connect(
  null,
  {
    onChangeLocation: dismissError,
  }
)(RootPageContainer)
