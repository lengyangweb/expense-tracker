'use client'

import React from 'react'
import { Button } from 'react-bootstrap'
import { logout } from '../services/userService'

const LogoutButton = () => {

  return (
    <Button
        variant='outline-secondary'
        className='rounded py-1'
        onClick={ async() => await logout() }
    >
        <div className="d-flex align-items-center gap-2">
            <span>Logout</span>
            <i className="pi pi-sign-out"></i>
        </div>
    </Button>
  )
}

export default LogoutButton