'use client'

import React from 'react'
import { logout, navigate } from '../services/userService'
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
        icon="pi pi-user"
        label="Profile"
        onClick={ () => navigate('/user-profile') }
        dropdownIcon="pi pi-chevron-up"
        style={{ focus: 'none', height: '40px' }}
    />
  )
}

export default LogoutButton