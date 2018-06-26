import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { LOADING_STATES } from '../../../constants'
import Profile from '../../../components/Profile'
import * as actions from '../actionCreators'
import { selectProfile } from '../selectors'
import Loading from '../renderers/Loading'
import Empty from '../renderers/Empty'

const propTypes = {
  login: PropTypes.string.isRequired,
  status: PropTypes.oneOf(LOADING_STATES).isRequired,
  onLoad: PropTypes.func.isRequired,
  user: PropTypes.shape(),
}

class ProfileContainer extends Component {
  static propTypes = propTypes

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
