"use client"

import { useRef } from "react"
import { toast } from "react-toastify"
import { Button } from "primereact/button"
import { useRouter } from "next/navigation"
import { InputText } from "primereact/inputtext"
import { authenticate } from "@/app/services/userService"

const LoginForm = () => {
    const formRef = useRef();
    const router = useRouter();

    async function signIn() {
        const username = formRef.current.username.value;
        const password = formRef.current.password.value;

        // if username or password is not provided
        if (!username || !password) return toast.error(`Username and password require`);

        const credential = { username, password }

        try {
            const response = await authenticate(credential);
            if (!response.success) return toast.error(response.message);
            router.push('/');
        } catch (error) {
            console.error(error);
            toast.error(`Something went wrong`);
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