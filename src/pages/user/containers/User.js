import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Profile } from '../../../features/profile'
import { StarredRepos } from '../../../features/starredRepos'

const User = ({ login }) => (
  <Fragment>
    <Profile login={login} />
    <hr />
    <StarredRepos login={login} />
  </Fragment>
)

export default connect((state, props) => ({
  login: props.match.params.login,
}))(User)
