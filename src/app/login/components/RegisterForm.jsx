'use client'

import { z } from 'zod'
import { toast } from 'react-toastify'
import { Form } from 'react-bootstrap'
import { Button } from 'primereact/button'
import React, { useRef, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { registerUser } from '@/app/services/userService'

// validate register fields
const Register = z.object({
    username: z.string({ required_error: 'username is required' }).min(2).max(30),
    email: z.string({ required_error: 'email is required' }).email('Invalid email address'),
    password: z.string({ required_error: 'password is required' }).min(10).max(50)
})

const RegisterForm = () => { 
    const [currentTab, setCurrentTab] = useState('register'); // TODO: reset this value when user change view to login
    const [errors, setError] = useState();
    const [goBack, setGoBack] = useState(false);

    const formRef = useRef();

    const register = async() => {
        const user = {
            username: formRef.current.username.value,
            email: formRef.current.email.value,
            password: formRef.current.password.value,
        };

        try {
            const response = await registerUser(user, formRef.current.accessCode.value);
            if (!response.success) return alert(response.message);
            alert(response.message);
        } catch (err) {
            console.error(err.message);
        }
    }

    const setTab = () => { setCurrentTab((current) => current = (current === 'register') ? 'code' : 'register') };

    function buildErrorMsg(errors) {
        let buildErrors = {};
        errors.forEach((error) => buildErrors[error.path[0]] = error.message.split("String")[1])
        setError((current) => current = buildErrors);
    }

    function validateRegisterFields() {
        const newUser = {
            username: formRef.current.username.value,
            email: formRef.current.email.value,
            password: formRef.current.password.value    
        };

        const validationResult = Register.safeParse(newUser);
        if (!validationResult.success) {
            buildErrorMsg(validationResult?.error?.errors)
            return toast.error(`Make sure all require fields are fill out correctly`);
        }
        setTab();
    }


  return (
    <Form ref={ formRef } action={ register } className='col-12 px-4 col-lg-12'>
        { currentTab === 'register' && (
            <>
                <div className='d-flex flex-column'>
                    <Form.Label htmlFor='username'>Username:</Form.Label>
                    { (errors && errors?.username ) && (<small className='text-danger'>{errors?.username}</small>)}
                    <InputText className='py-2' id='username' name='username' />
                </div>
                <div className='d-flex flex-column mt-2'>
                    <Form.Label htmlFor='email'>Email:</Form.Label>
                    { (errors && errors?.email ) && (<small className='text-danger'>{errors?.email}</small>)}
                    <InputText className='py-2' type='email' id='email' name='email' />
                </div>
                <div className='d-flex flex-column mt-2'>
                    <Form.Label htmlFor='password'>Password:</Form.Label>
                    { (errors && errors?.password ) && (<small className='text-danger'>{errors?.password}</small>)}
                    <InputText className='py-2' type='password' id='password' name='password' />
                </div>
            </>
        )}
        { currentTab !== 'register' && (
            <div className='d-flex flex-column mt-2'>
                <Form.Label htmlFor='accessCode'><strong>Access Code</strong> (<small><i>Obtain from admin</i></small>):</Form.Label>
                <InputText className='py-2' type="password" id='accessCode'name='accessCode' />
            </div>
        )}
        <div className="d-flex justify-content-center gap-1 mt-4">
            { currentTab === 'register' && (<Button className='py-2 px-3 rounded' label='Continue' onClick={validateRegisterFields} />)}
            { currentTab !== 'register' && (<Button className='py-2 px-3 rounded' label='Back' onClick={setTab} />)}
            { currentTab !== 'register' && (<Button className='py-2 px-3 rounded' label='Register' icon="pi pi-user-plus" iconPos='right' />)}
        </div>
    </Form>
  )
}

export default RegisterForm