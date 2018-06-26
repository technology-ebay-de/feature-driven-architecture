import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Search } from '../../../features/search'
import { Error, dismiss as dismissError } from '../../../features/error'

class RootPageContainer extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.search !== this.props.search) {
      this.props.onChangeSearch()
    }
  }

  render() {
    const { search, onSearch } = this.props
    return (
      <Fragment>
        <Search value={search} onSearch={onSearch} />
        <Error />
      </Fragment>
    )
  }
}

export default connect(
  (state, { location, history }) => ({
    search: location.pathname.substr(1),
    onSearch: ({ value }) => {
      history.push(`/${value}`)
    },
  }),
  {
    onChangeSearch: dismissError,
  }
)(RootPageContainer)
