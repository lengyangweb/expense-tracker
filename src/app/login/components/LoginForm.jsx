import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"

const LoginForm = () => {
  return (
    <form className="px-4">
        <div className="form-group d-flex flex-column">
            <label htmlFor="username" className="form-label">Username:</label>
            <InputText
                name="username"
                id="username"
            />
        </div>
        <div className="form-group d-flex flex-column my-2">
            <label htmlFor="password" className="form-label">Password:</label>
            <InputText
                type="password"
                name="password"
                id="password"
            />
        </div>
        <div className="form-group d-flex justify-content-center mt-4">
            <Button
                className="rounded"
                severity="primary"
                label="LOGIN"
                icon="pi pi-sign-in"
                iconPos="right"
            />
        </div>
    </form>
  )
}

export default LoginForm