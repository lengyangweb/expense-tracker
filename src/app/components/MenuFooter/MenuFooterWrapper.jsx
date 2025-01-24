'use client'

import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { useRouter } from 'next/navigation'
import { logout } from '../../services/userService'

const MenuFooterWrapper = ({ username }) => {
    const router = useRouter();

    let items = [
        {  label: 'Profile', icon: 'pi pi-user', command: async () => router.push('/user-profile') },
        { label: 'Config', icon: 'pi pi-cog', command: async () => router.push('/admin-config') },
        {  label: 'Logout', icon: 'pi pi-sign-out', command: async () => await logout() }
    ]

    if (username && username !== 'admin') {
        items = items.filter((item) => !item.label.includes('Admin'));
    }

  return (
    <div className='w-100 bg-secondary text-white border-0 px-2 py-1'>
      <div className="d-flex justify-content-between align-items-center">
        <span>Settings</span>
        <Dropdown drop='up'>
          <Dropdown.Toggle className='border-0 text-white' variant="white" id="dropdown-basic" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          </Dropdown.Toggle>
        <Dropdown.Menu>
          <div className="d-flex align-items-center">
            <div className="px-2 py-1 border border-2 border-dark bg-dark rounded-circle mx-2">
              <i className="pi pi-user w-100 text-light"></i>
            </div>
            <span className="fw-bold">ADMIN</span>
          </div>
          <Dropdown.Divider />
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

export default MenuFooterWrapper