'use client'

import React from 'react'
import { Button } from 'react-bootstrap'
import { logout } from '../services/userService'
import { SplitButton } from 'primereact/splitbutton'

const LogoutButton = () => {

    const items = [
        { 
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: async () => await logout()
        }
    ]

  return (
    <SplitButton
        className='w-100'
        severity='secondary'
        model={ items }
        label="Profile"
        dropdownIcon="pi pi-chevron-up"
        style={{ focus: 'none', height: '40px' }}
    />
    // <Button
    //     variant='outline-secondary'
    //     className='rounded py-1'
    //     onClick={ async() => await logout() }
    // >
    //     <div className="d-flex align-items-center gap-2">
    //         <span>Logout</span>
    //         <i className="pi pi-sign-out"></i>
    //     </div>
    // </Button>
  )
}

export default LogoutButton