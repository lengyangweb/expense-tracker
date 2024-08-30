'use client'

import React from 'react'
import { logout, navigate } from '../services/userService'
import { SplitButton } from 'primereact/splitbutton'
import { Button, Dropdown } from 'react-bootstrap'
import { useRouter } from 'next/navigation'


const MenuFooter = () => {
  const router = useRouter();

    const items = [
        { 
            label: 'Profile',
            icon: 'pi pi-user',
            command: async () => router.push('/user-profile')
        },
        { 
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: async () => await logout()
        }
    ]

  return (
    <div className='w-100 bg-secondary text-white border-0 px-2 py-2'>
      <div className="d-flex justify-content-between align-items-center">
        <span>Settings</span>
        {/* <i className="pi pi-sign-out"></i> */}
       <Dropdown drop='up'>
         <Dropdown.Toggle className='border-0 text-white' variant="white" id="dropdown-basic" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         </Dropdown.Toggle>
         <Dropdown.Menu>
           {
             items.map(({ label, icon, command }) => (
               <Dropdown.Item key={label} onClick={command}>
                 <div className="d-flex justify-content-between align-items-center gap-2">
                   <span>{ label }</span>
                   <i className={icon}></i>
                 </div>
               </Dropdown.Item>
             ))
           }
         </Dropdown.Menu>
       </Dropdown>
      </div>
    </div>
  )
}

export default MenuFooter