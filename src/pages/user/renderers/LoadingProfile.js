import React from 'react'

const LoadingProfile = ({ login }) => (
  <h1>
    <i>
      Loading {login}
      {"'s profile..."}
    </i>
  </h1>
)

export default LoadingProfile
