import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actionCreators'
import { selectProfile } from '../selectors'
import Loading from '../renderers/Loading'
import Profile from '../renderers/Profile'
import Empty from '../renderers/Empty'

class ProfileContainer extends Component {
  componentDidMount() {
    this.load()
  }

  componentDidUpdate(prevProps) {
    this.load(prevProps.login)
  }

  load(prevLogin) {
    const { login, onLoad, status } = this.props
    if (login && login !== prevLogin && status !== 'loading') {
      onLoad({ login })
    }
  }

  render() {
    const { status, login, avatarUrl, name } = this.props

    if (status === 'loading') {
      return <Loading login={login} />
    }

    if (status === 'loaded') {
      return <Profile login={login} avatarUrl={avatarUrl} name={name} />
    }

    return <Empty />
  }
}

export default connect(
  selectProfile,
  {
    onLoad: actions.load,
  }
)(ProfileContainer)
