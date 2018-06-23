import React from 'react';
import { connect } from 'react-redux';
import ErrorRenderer from '../renderers/Error';
import { dismiss } from '../actionCreators';
import { getError } from '../selectors';

const Error = props => (props.message ? <ErrorRenderer {...props} /> : null);

export default connect(
  getError,
  {
    onDismiss: dismiss,
  }
)(Error);
