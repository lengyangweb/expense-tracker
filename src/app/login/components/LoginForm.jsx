"use client"

import { useRef } from "react"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { authenticate, navigate } from "@/app/services/userService"

const LoginForm = () => {
    const formRef = useRef();

    async function signIn() {
        const credential = {
            username: formRef.current.username.value,
            password: formRef.current.password.value
        }

        try {
            const response = await authenticate(credential);
            if (!response.success) return alert(response.message);
            navigate('/');
        } catch (error) {
            console.error(error);
            alert('Something went wrong');
        }
    }

  return (
    <form ref={formRef} action={signIn} className="col-12 px-4 col-lg-12">
        <div className="form-group d-flex flex-column">
            <label htmlFor="username" className="form-label">Username:</label>
            <InputText
                className="py-2"
                name="username"
                id="username"
            />
        </div>
        <div className="form-group d-flex flex-column my-2">
            <label htmlFor="password" className="form-label">Password:</label>
            <InputText
                className="py-2"
                type="password"
                name="password"
                id="password"
            />
        </div>
        <div className="form-group d-flex justify-content-center mt-4">
            <Button
                type="submit"
                className="py-2 rounded"
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