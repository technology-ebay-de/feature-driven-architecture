import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Repo } from '../../../features/repo'
import { Stargazers } from '../../../features/stargazers'

const RepoPage = ({ fullName }) => (
  <Fragment>
    <Repo fullName={fullName} />
    <Stargazers fullName={fullName} />
  </Fragment>
)

export default connect((state, props) => ({
  fullName: `${props.match.params.login}/${props.match.params.repo}`,
}))(RepoPage)
