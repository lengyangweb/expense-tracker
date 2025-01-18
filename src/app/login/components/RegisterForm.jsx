'use client'

import { z } from 'zod'
import { toast } from 'react-toastify'
import { Form } from 'react-bootstrap'
import { Button } from 'primereact/button'
import React, { useRef, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { registerUser } from '@/app/services/userService'

// validate register fields
const validateRegister = z.object({
    username: z.string().min(4,'username must be at least 4 characters long'),
    email: z.string().email('Please provide a valid email address'),
    password: z.string().min(10, 'password must be at least 10 characerts long')
})

const validateAccessCode = z.string().min(16, 'Must be greater than 16 characters long');

const RegisterForm = () => { 
    const formRef = useRef();
    const [errors, setError] = useState();
    const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });
    const [currentTab, setCurrentTab] = useState('register');

    const register = async() => {
        const accessCode = formRef.current.accessCode.value;
        if (errors) setError((error) => error = undefined);
        const validationResult = validateAccessCode.safeParse(accessCode);
        if (!validationResult.success) return setError((currentError) => currentError = { accessCode: validationResult.error.errors[0].message });

        try {
            const response = await registerUser(newUser, accessCode);
            if (!response.success) return toast.error(response.message);
            toast.success(response.message);
        } catch (err) {
            console.error(err.message);
            toast.error('Something went wrong');
        }
    }

    const setTab = () => { setCurrentTab((current) => current = (current === 'register') ? 'code' : 'register') };

    function buildErrorMsg(errors) {
        let buildErrors = {};
        errors.forEach((error) => buildErrors[error.path[0]] = error.message.split("String")[1])
        setError((current) => current = buildErrors);
    }

    function validateRegisterFields() {
        const user = {
            username: formRef.current.username.value,
            email: formRef.current.email.value,
            password: formRef.current.password.value  
        }
        if (errors) setError((error) => error = undefined);
        setNewUser((current) => current = { ...user });
        const validationResult = validateRegister.safeParse(user);
        if (!validationResult.success) {
            buildErrorMsg(validationResult?.error?.errors)
            return toast.error(`Make sure all require fields are fill out correctly.`);
        }
        setTab();
    }


  return (
    <Form ref={ formRef } action={ register } className='col-12 px-4 col-lg-12'>
        { currentTab === 'register' && (
            <>
                <div className='d-flex flex-column'>
                    <Form.Label htmlFor='username'>Username:</Form.Label>
                    { (errors && errors?.username ) && (<small className='text-danger'><strong>{errors?.username}</strong></small>)}
                    <InputText className='py-2' id='username' name='username' />
                </div>
                <div className='d-flex flex-column mt-2'>
                    <Form.Label htmlFor='email'>Email:</Form.Label>
                    { (errors && errors?.email ) && (<small className='text-danger'><strong>{errors?.email}</strong></small>)}
                    <InputText className='py-2' type='email' id='email' name='email' />
                </div>
                <div className='d-flex flex-column mt-2'>
                    <Form.Label htmlFor='password'>Password:</Form.Label>
                    { (errors && errors?.password ) && (<small className='text-danger'><strong>{errors?.password}</strong></small>)}
                    <InputText className='py-2' type='password' id='password' name='password' />
                </div>
            </>
        )}
        { currentTab !== 'register' && (
            <div className='d-flex flex-column mt-2'>
                <Form.Label htmlFor='accessCode'><strong>Access Code</strong> (<small><i>Obtain from admin</i></small>):</Form.Label>
                <InputText className='py-2' type="text" id='accessCode'name='accessCode' style={{ outlineColor: 'red' }} />
                { (errors && errors?.accessCode ) && (<small className='text-danger d-flex justify-content-center'><strong>{errors?.accessCode}</strong></small>) }
            </div>
        )}
        <div className="d-flex justify-content-center gap-1 mt-4">
            { currentTab === 'register' && (<Button className='py-2 px-3 rounded' type='button' label='Continue' onClick={validateRegisterFields} />)}
            {/* { currentTab !== 'register' && (<Button className='py-2 px-3 rounded' type='button' label='Back' onClick={setTab} />)} */}
            { currentTab !== 'register' && (<Button className='py-2 px-3 rounded' type='submit' label='Register' icon="pi pi-user-plus" iconPos='right' />)}
        </div>
    </Form>
  )
}

export default RegisterForm