import React from 'react'

const ErrorMessage = ({ errorMessage }) => {
  return (
    <div className='text-danger'>{errorMessage}</div>
  )
}

export default ErrorMessage