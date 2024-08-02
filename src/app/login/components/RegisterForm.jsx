'use client'

import React, { useRef } from 'react'
import { Form } from 'react-bootstrap'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { registerUser } from '@/app/services/userService'

const RegisterForm = () => {
    const formRef = useRef();

    const register = async() => {
        const user = {
            username: formRef.current.username.value,
            password: formRef.current.password.value,
        };

        try {
            const response = await registerUser(user, formRef.current.accessCode.value);
            if (!response.success) return alert(response.message);
            alert(response.message);
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <Form ref={ formRef } action={ register } className='col-12 px-4 col-lg-12'>
        <div className='d-flex flex-column'>
            <Form.Label htmlFor='username'>Username:</Form.Label>
            <InputText
                className='py-2'
                id='username'
                name='username'
            />
        </div>
        <div className='d-flex flex-column mt-2'>
            <Form.Label htmlFor='password'>Password:</Form.Label>
            <InputText
                className='py-2'
                type='password'
                id='password'
                name='password'
            />
        </div>
        <div className='d-flex flex-column mt-2'>
            <Form.Label htmlFor='accessCode'>Access Code:</Form.Label>
            <InputText
                className='py-2'
                type="password"
                id='accessCode'
                name='accessCode'
            />
        </div>
        <d className="d-flex justify-content-center mt-4">
            <Button
                className='py-2 px-3 rounded'
                label='Register'
                icon="pi pi-user-plus"
                iconPos='right'
            />
        </d>
    </Form>
  )
}

export default RegisterForm