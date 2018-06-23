import React from 'react'

export default ({ message, onDismiss }) => (
  <p style={{ backgroundColor: '#e99', padding: 10 }}>
    <b>{message}</b>{' '}
    <button
      onClick={e => {
        e.preventDefault()
        onDismiss()
      }}
    >
      Dismiss
    </button>
  </p>
)
