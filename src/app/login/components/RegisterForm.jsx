'use client'

import React, { useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { registerUser } from '@/app/services/userService'

const RegisterForm = ({ reset }) => { 
    const [next, setNext] = useState(reset); // TODO: reset this value when user change view to login
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

  return (
    <Form ref={ formRef } action={ register } className='col-12 px-4 col-lg-12'>
        { next === false && (
            <>
                <div className='d-flex flex-column'>
                    <Form.Label htmlFor='username'>Username:</Form.Label>
                    <InputText className='py-2' id='username' name='username' />
                </div>
                <div className='d-flex flex-column mt-2'>
                    <Form.Label htmlFor='email'>Email:</Form.Label>
                    <InputText className='py-2' type='email' id='email' name='email' />
                </div>
                <div className='d-flex flex-column mt-2'>
                    <Form.Label htmlFor='password'>Password:</Form.Label>
                    <InputText className='py-2' type='password' id='password' name='password' />
                </div>
            </>
        )}
        { next === true && (
            <div className='d-flex flex-column mt-2'>
                <Form.Label htmlFor='accessCode'><strong>Access Code</strong> (<small><i>Obtain from admin</i></small>):</Form.Label>
                <InputText className='py-2' type="password" id='accessCode'name='accessCode' />
            </div>
        )}
        <div className="d-flex justify-content-center mt-4">
            { next === false && ( <Button className='py-2 px-3 rounded' label='Continue' onClick={setNext((curr) => curr = !curr )} /> )}
            { next === true && ( <Button className='py-2 px-3 rounded' label='Register' icon="pi pi-user-plus" iconPos='right' /> )}
        </div>
    </Form>
  )
}

export default RegisterForm