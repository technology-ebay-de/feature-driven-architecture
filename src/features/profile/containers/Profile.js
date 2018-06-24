import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actionCreators'
import Loading from '../renderers/Loading'
import Profile from '../renderers/Profile'
import { selectProfile } from '../selectors'

class ProfileContainer extends Component {
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
    const { status, login, avatarUrl, name } = this.props

    if (status === 'loading') {
      return <Loading login={login} />
    }

    return <Profile login={login} avatarUrl={avatarUrl} name={name} />
  }
}

export default connect(
  selectProfile,
  {
    onLoad: actions.load,
  }
)(ProfileContainer)
