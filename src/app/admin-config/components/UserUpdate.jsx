
import { Dialog } from 'primereact/dialog'
import { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'

const UserUpdate = ({ selectedUser }) => {
  const [updateVisible, setUpdateVisible] = useState(false);

  return (
    <Row>
        <Col xs={12}>
            <Button className="btn btn-info" onClick={() => setUpdateVisible((visible) => visible = !visible)} disabled={!selectedUser}>Update User Info</Button>
        </Col>
        <Dialog header="Update User Info" position='top' visible={updateVisible} style={{ width: '25vw' }} onHide={() => setUpdateVisible((visible) => visible = !visible )}>
            <form>
                <div className="form-group">
                    <label htmlFor="username" className="form-label">Username:</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" className="form-control" />
                </div>
                <div className="form-group">
                    <Button >Update</Button>
                </div>
            </form>
        </Dialog>
    </Row>
  )
}

export default UserUpdate