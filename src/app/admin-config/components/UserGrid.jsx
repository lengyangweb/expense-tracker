'use client'

import { useState } from "react"
import UserUpdate from "./UserUpdate"
import { Col, Row } from "react-bootstrap"
import Grid from "@/app/components/Grid/Grid"

const UserGrid = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState();
  
  if (!users || !users.length) return <span>No users.</span>

  const userColumns = [
    { field: 'username', header: 'Username' },
    { field: 'email', header: 'Email' }
]

  return (
    <Row>
        <Col xs={12}>
            <h5>Users:</h5>
        </Col>
        <Col xs={12} className="mb-2">
            <UserUpdate selectedUser={selectedUser} />
        </Col>
        <Col xs={12}>
            <Grid 
                columns={userColumns} 
                rows={users} 
                selectedRow={selectedUser}
                setRowSelected={setSelectedUser}
            />
        </Col>
    </Row>
  )
}

export default UserGrid