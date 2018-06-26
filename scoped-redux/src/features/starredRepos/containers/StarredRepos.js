import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { LOADING_STATES } from '../../../constants'
import List from '../../../components/List'
import Repo from '../../../components/Repo'
import * as actions from '../actionCreators'
import { selectStarredRepos } from '../selectors'

const propTypes = {
  login: PropTypes.string.isRequired,
  status: PropTypes.oneOf(LOADING_STATES).isRequired,
  onLoad: PropTypes.func.isRequired,
  onLoadNext: PropTypes.func.isRequired,
  nextPageUrl: PropTypes.string,
  lastPageUrl: PropTypes.string,
  starred: PropTypes.array.isRequired,
}

class StarredReposContainer extends Component {
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
    const {
      login,
      starred,
      onLoadNext,
      nextPageUrl,
      lastPageUrl,
      status,
    } = this.props

    return (
      <List
        renderItem={props => <Repo {...props} key={props.repo.fullName} />}
        items={starred}
        onLoadNext={onLoadNext}
        loadingLabel={`Loading ${login}'s starred...`}
        nextPageUrl={nextPageUrl}
        lastPageUrl={lastPageUrl}
        status={status}
      />
    )
  }
}

export default connect(
  selectStarredRepos,
  {
    onLoad: actions.load,
    onLoadNext: actions.loadNext,
  }
)(StarredReposContainer)
