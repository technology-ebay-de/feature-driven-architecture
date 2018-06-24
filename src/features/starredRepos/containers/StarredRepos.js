import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { StarredRepos } from '../../../features/profile'
import List from '../../../lib/components/List'
import * as actions from '../actionCreators'
import Repo from '../renderers/Repo'
import { selectStarredRepos } from '../selectors'

const renderRepo = props => <Repo {...props} key={props.repo.fullName} />

class StarredReposContainer extends Component {
  static defaultProps = {
    isLoading: false,
  }

  componentDidMount() {
    this.load()
  }

  componentDidUpdate(prevProps) {
    this.load(prevProps.login)
  }

  load(prevLogin) {
    const { login, onLoad } = this.props
    if (login && login !== prevLogin) {
      onLoad({ login })
    }
  }

  render() {
    const {
      login,
      starred,
      onLoadMore,
      nextPageUrl,
      lastPageUrl,
      isLoading,
    } = this.props

    return (
      <List
        renderItem={renderRepo}
        items={starred}
        onLoadMore={onLoadMore}
        loadingLabel={`Loading ${login}'s starred...`}
        nextPageUrl={nextPageUrl}
        lastPageUrl={lastPageUrl}
        isLoading={isLoading}
      />
    )
  }
}

export default connect(
  selectStarredRepos,
  {
    onLoad: actions.load,
    onLoadMore: actions.loadMore,
  }
)(StarredReposContainer)
