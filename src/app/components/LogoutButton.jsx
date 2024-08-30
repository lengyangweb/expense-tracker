'use client'

import React from 'react'
import { logout, navigate } from '../services/userService'
import { SplitButton } from 'primereact/splitbutton'
import { Dropdown } from 'react-bootstrap'
import { useRouter } from 'next/navigation'


const LogoutButton = () => {
  const router = useRouter();

    const items = [
        { 
            label: 'Profile',
            icon: 'pi pi-user',
            command: async () => router.push('/profile')
        },
        { 
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: async () => await logout()
        }
    ]

  return (
    <div className="w-100">
      <Dropdown drop='up' className='w-100'>
        <Dropdown.Toggle className='w-100 border-0' variant="secondary" id="dropdown-basic">
          Settings
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {
            items.map(({ label, icon, command }) => (
              <Dropdown.Item key='label' onClick={command}>
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <span>{ label }</span>
                  <i className={icon}></i>
                </div>
              </Dropdown.Item>
            ))
          }
        </Dropdown.Menu>
      </Dropdown>
    </div>
    // <SplitButton
    //     className='w-100'
    //     severity='secondary'
    //     model={ items }
    //     icon="pi pi-user"
    //     label="Profile"
    //     onClick={ () => navigate('/user-profile') }
    //     dropdownIcon="pi pi-chevron-up"
    //     style={{ focus: 'none', height: '40px' }}
    // />
  )
}

export default LogoutButton