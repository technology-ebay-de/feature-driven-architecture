import React, { Component, Fragment } from 'react'

const Input = ({ value, onSearch, onChange }) => (
  <input
    size="45"
    value={value}
    onKeyUp={({ keyCode }) => {
      if (keyCode === 13) onSearch()
    }}
    onChange={e => {
      onChange({ value: e.target.value })
    }}
  />
)

const Label = () => (
  <label style={{ display: 'block' }}>
    Type a username or repo full name and hit 'Go':
  </label>
)

const RepoHint = () => (
  <p>
    Code on{' '}
    <a
      href="https://github.com/reduxjs/redux"
      target="_blank"
      rel="noopener noreferrer"
    >
      Github (TODO replace once known)
    </a>.
  </p>
)

const DevToolsHint = () => (
  <p>Move the DevTools with Ctrl+W or hide them with Ctrl+H.</p>
)

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = { value: props.value }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value })
    }
  }

  onChange = ({ value }) => {
    this.setState({ value })
  }

  onSearch = () => {
    this.props.onSearch({ value: this.state.value })
  }

  render() {
    return (
      <Fragment>
        <Label />
        <Input
          value={this.state.value}
          onChange={this.onChange}
          onSearch={this.onSearch}
        />
        <button onClick={this.onSearch}>Go!</button>
        <RepoHint />
        <DevToolsHint />
      </Fragment>
    )
  }
}
