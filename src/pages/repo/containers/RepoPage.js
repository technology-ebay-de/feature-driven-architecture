import React, { Fragment } from 'react'
import { connect } from 'react-redux'

const RepoPage = ({ login }) => <Fragment>test</Fragment>

export default connect((state, props) => ({
  login: props.match.params.login,
}))(RepoPage)
