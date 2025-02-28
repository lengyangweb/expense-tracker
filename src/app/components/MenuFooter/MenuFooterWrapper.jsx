'use client'

import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { useRouter } from 'next/navigation'
import { logout } from '../../services/userService'
import Confirm from '../Confirm'

const MenuFooterWrapper = ({ username }) => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const router = useRouter();

    let items = [
        {  label: 'Profile', icon: 'pi pi-user', command: async () => router.push('/user-profile') },
        { label: 'Config', icon: 'pi pi-cog', command: async () => router.push('/admin-config') },
        {  label: 'Logout', icon: 'pi pi-sign-out', command: async () => setShowLogoutModal(true) }
    ]

    async function logoutUser() {
      try {
        await logout();
      } catch (error) {
        console.error(error);
      }
    }

    if (username && username !== 'admin') {
        items = items.filter((item) => !item.label.includes('Config'));
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
            <span className="fw-bold">{username}</span>
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
      <Confirm 
        show={showLogoutModal} 
        setShow={setShowLogoutModal}
        handleShow={() => setShowLogoutModal(true)}
        handleClose={() => setShowLogoutModal(false)}
        title='Logout Prompt'
        message='Are you sure you want to logout?'
        action={logoutUser}
        cancelText='No'
        confirmText='Yes'
      />
    </div>
  )
}

export default MenuFooterWrapper