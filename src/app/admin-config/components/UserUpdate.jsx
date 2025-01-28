
import z from 'zod'
import { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button, Col, Row } from 'react-bootstrap'

const validateUser = z.object({
    username: z.string().min(3),
    email: z.string().email('Invalid email'),
    password: z.string().min(10).max(100)
}) 

const UserUpdate = ({ selectedUser }) => {
  const [user, setUser] = useState(selectedUser);
  const [updateVisible, setUpdateVisible] = useState(false);

  async function updateUserInfo() {

  }

  return (
    <Row>
        <Col xs={12}>
            <Button className="btn btn-info" onClick={() => setUpdateVisible((visible) => visible = !visible)} disabled={!selectedUser}>Update User Info</Button>
        </Col>
        <Dialog header="Update User Info" visible={updateVisible} style={{ width: '35vw' }} onHide={() => setUpdateVisible((visible) => visible = !visible )} draggable={false} resizable={false}>
            <form>
                <div className="form-group">
                    <label htmlFor="username" className="form-label">Username:</label>
                    <input type="text" className="form-control" value={user.username} onChange={(e) => setUser((user) => user.username = e.target.value)} />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="text" className="form-control" value={user.email} onChange={(e) => setUser((user) => user.email = e.target.value)} />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" className="form-control" />
                </div>
                <div className="form-group mt-4">
                    <div className="d-flex justify-content-center">
                        <Button >Update</Button>
                    </div>
                </div>
            </form>
        </Dialog>
    </Row>
  )
}

export default UserUpdate