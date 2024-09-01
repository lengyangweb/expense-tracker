import React from 'react'
import { Container } from 'react-bootstrap'
import DemoContainer from './components/DemoContainer';

const page = () => {
  return (
    <Container fluid className='p-3'>
        <DemoContainer />
    </Container>
  )
}

export default page