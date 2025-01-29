
import z from 'zod'
import { useEffect, useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button, Col, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'

const validateUsernameEmail = z.object({
    username: z.string().min(3),
    email: z.string().email('Invalid email'),
}) 

const validatePassword = z.string().min(20)

const UserUpdate = ({ selectedUser }) => {
  const [user, setUser] = useState({ username: undefined, email: undefined, password: undefined });
  const [updateVisible, setUpdateVisible] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (selectedUser) setUser((currentUser) => currentUser = { ...selectedUser });
  }, [selectedUser])

  function buildErrorMsg(errors) {
    let buildErrors = {};
    errors.forEach((error) => buildErrors[error.path[0]] = error.message.split("String")[1])
    setError((current) => current = buildErrors);
}

  async function updateUserInfo() {
    const usernameEmailResult = validateUsernameEmail.safeParse(user);
    if (!usernameEmailResult.success) {
        buildErrorMsg(usernameEmailResult?.error?.errors)
        return toast.error(`Make sure all require fields are fill out correctly.`);
    }
  }

  return (
    <Row>
        <Col xs={12}>
            <Button className="btn btn-info" onClick={() => setUpdateVisible((visible) => visible = !visible)} disabled={!selectedUser}>Update User Info</Button>
        </Col>
        <Dialog header="Update User Info" visible={updateVisible} style={{ width: '35vw' }} onHide={() => setUpdateVisible((visible) => visible = !visible )} draggable={false} resizable={false}>
            <form action={ updateUserInfo }>
                <div className="form-group">
                    <label htmlFor="username" className="form-label">Username:</label><br/>
                    {error?.username && (<span className='text-danger'>{error.username}</span>)}
                    <input type="text" className="form-control" value={user?.username} onChange={(e) => setUser((user) => user = { ...user, username: e.target.value })} />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="email" className="form-label">Email:</label><br/>
                    {error?.email && (<span className='text-danger'>{error.email}</span>)}
                    <input type="text" className="form-control" value={user?.email} onChange={(e) => setUser((user) => user = { ...user, email: e.target.value })} />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="password" className="form-label">Password:</label><br/>
                    {error?.password && (<span className='text-danger'>{error.password}</span>)}
                    <input type="password" className="form-control" value={user?.password} onChange={(e) => setUser((user) => user = { ...user, password: e.target.value })} />
                </div>
                <div className="form-group mt-4">
                    <div className="d-flex justify-content-center">
                        <Button type='submit'>Update</Button>
                    </div>
                </div>
            </form>
        </Dialog>
    </Row>
  )
}

export default UserUpdate