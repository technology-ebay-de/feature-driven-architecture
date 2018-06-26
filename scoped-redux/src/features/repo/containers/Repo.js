import React, { Component } from 'react'
import { connect } from 'react-redux'
import Repo from '../../../components/Repo'
import * as actions from '../actionCreators'
import { selectRepo } from '../selectors'
import Loading from '../renderers/Loading'
import Empty from '../renderers/Empty'

class RepoContainer extends Component {
  componentDidMount() {
    this.load()
  }

  componentDidUpdate(prevProps) {
    this.load(prevProps.fullName)
  }

  load(prevFullName) {
    const { fullName, onLoad, status } = this.props
    if (fullName && fullName !== prevFullName && status !== 'loading') {
      onLoad({ fullName })
    }
  }

  render() {
    const { status, fullName, repo, owner } = this.props

    if (status === 'loading') {
      return <Loading fullName={fullName} />
    }

    if (status === 'loaded') {
      return <Repo repo={repo} owner={owner} />
    }

    return <Empty />
  }
}

export default connect(
  selectRepo,
  {
    onLoad: actions.load,
  }
)(RepoContainer)
