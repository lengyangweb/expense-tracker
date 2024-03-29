import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loading = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center gap-2 my-3">
      <Spinner />
      <span>Loading...</span>
    </div>
  )
}

export default Loading