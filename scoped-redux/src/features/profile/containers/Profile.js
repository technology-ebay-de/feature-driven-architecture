import React, { Component } from 'react'
import { connect } from 'react-redux'
import Profile from '../../../components/Profile'
import * as actions from '../actionCreators'
import { selectProfile } from '../selectors'
import Loading from '../renderers/Loading'
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
    const { status, login, user } = this.props

    if (status === 'loading') {
      return <Loading login={login} />
    }

    if (status === 'loaded') {
      return <Profile {...user} />
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
