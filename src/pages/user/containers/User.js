import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import zip from 'lodash/zip'
import List from '../../../lib/components/List'
import * as actions from '../actionCreators'
import LoadingProfile from '../renderers/LoadingProfile'
import Profile from '../renderers/Profile'
import Repo from '../renderers/Repo'
import { getUser } from '../selectors'

const renderRepo = props => <Repo {...props} key={props.repo.fullName} />

class User extends Component {
  static defaultProps = {
    isFetchingMoreStarred: false,
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
      user,
      starred,
      onLoadMore,
      nextPageUrl,
      lastPageUrl,
      isFetchingMoreStarred,
    } = this.props

    return (
      <Fragment>
        {user ? <Profile {...user} /> : <LoadingProfile login={login} />}
        <hr />
        <List
          renderItem={renderRepo}
          items={starred}
          onLoadMore={onLoadMore}
          loadingLabel={`Loading ${login}'s starred...`}
          nextPageUrl={nextPageUrl}
          lastPageUrl={lastPageUrl}
          isFetching={isFetchingMoreStarred}
        />
      </Fragment>
    )
  }
}

export default connect(
  (state, props) => ({
    ...getUser(state),
    login: props.match.params.login,
  }),
  {
    onLoad: actions.load,
    onLoadMore: actions.loadMore,
  }
)(User)
