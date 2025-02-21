
import z from 'zod'
import { useEffect, useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button, Col, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { updateUser } from '@/app/services/userService'

const validateUsernameEmail = z.object({
    username: z.string().min(3),
    email: z.string().email('Invalid email'),
    password: z.string()
}) 

const validatePassword = z.object({
    password: z.string().min(20)
})

const UserUpdate = ({ selectedUser }) => {
  const [user, setUser] = useState({ username: undefined, email: undefined, password: undefined, confirmPassword: undefined });
  const [updateVisible, setUpdateVisible] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (selectedUser) setUser((currentUser) => currentUser = { ...selectedUser });
  }, [selectedUser])

  /**
   * structure error to a readable object
   * @param {z.ZodIssue[]} errors 
   */
  function buildErrorMsg(errors) {
    let buildErrors = {};
    errors.forEach((error) => {
        if ('validation' in error) return buildErrors[error.validation] = error.message;
        if ('path' in error) return buildErrors[error.path[0]] = error.message.split("String")[1];
    })
    setError((current) => current = buildErrors);
  }

  async function validateUserInfo() {
    let errors = [];
    const usernameEmailResult = validateUsernameEmail.safeParse(user);
    if (!usernameEmailResult.success) errors = [...errors, ...usernameEmailResult?.error?.errors];
    if (user.password) { // if password is provide, then validate the password
        if (user.password.length !== user.confirmPassword.length) return errors = [...errors, { validation: 'confirmPassword', message: `Password length mismatch` }];
        if (user.confirmPassword !== user.password) return errors = [...errors, { validation: 'confirmPassword', message: `Confirm password must match password` }];

        const validatePasswordResult = validatePassword.safeParse({ password: user.password });
        if (!validatePasswordResult.success) errors = [...errors, ...validatePasswordResult?.error.errors]; // push errors if validation fail
    }
    if (errors.length) {
        buildErrorMsg(errors);
        return toast.error(`Make sure all require fields are fill out correctly.`);
    }
    await updateUserInfo();
  }

  async function updateUserInfo() {
    try {
        const result = await updateUser(user);
        if (!result) return toast.error('Something went wrong, please try again');
        if (!result.success) return toast.error(result.message);
        toast.success(result.message);
        setUpdateVisible(false); // close modal
        setUser(undefined);
    } catch (error) {
        console.error(error);
        toast.error('Something went wrong, please try again.');
    }
  }

  return (
    <Row>
        <Col xs={12}>
            <Button className="btn btn-info" onClick={() => setUpdateVisible((visible) => visible = !visible)} disabled={!selectedUser}>Update User Info</Button>
        </Col>
        <Dialog header="Update User Info" visible={updateVisible} style={{ width: '35vw' }} onHide={() => setUpdateVisible((visible) => visible = !visible )} draggable={false} resizable={false}>
            <form action={ validateUserInfo }>
                <div className="form-group">
                    <label htmlFor="username" className="form-label">Username:</label><br/>
                    {error?.username && (<span className='text-danger'>{error.username}</span>)}
                    <input type="text" id='username' className="form-control" value={user?.username} onChange={(e) => setUser((user) => user = { ...user, username: e.target.value })} />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="email" className="form-label">Email:</label><br/>
                    {error?.email && (<span className='text-danger'>{error.email}</span>)}
                    <input type="email" id='email' className="form-control" value={user?.email} onChange={(e) => setUser((user) => user = { ...user, email: e.target.value })} />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="password" className="form-label">Password:</label><br/>
                    {error?.password && (<span className='text-danger'>{error.password}</span>)}
                    <input type="password" id='password' className="form-control" value={user?.password} onChange={(e) => setUser((user) => user = { ...user, password: e.target.value })} />
                </div>
                { (user.password && user.password.length > 0) && (
                    <div className="form-group my-2">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label><br/>
                        {error?.confirmPassword && (<span className='text-danger'>{error.confirmPassword}</span>)}
                        <input type="password" id='confirmPassword' className="form-control" value={user?.confirmPassword} onChange={(e) => setUser((user) => user = { ...user, confirmPassword: e.target.value })} />
                    </div>
                )}
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