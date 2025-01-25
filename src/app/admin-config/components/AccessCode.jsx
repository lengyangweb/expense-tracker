import Grid from '@/app/components/Grid/Grid'
import { Button } from 'primereact/button'
import React from 'react'
import { Row } from 'react-bootstrap'

const AccessCode = () => {
  const codeColumns = [{ field: 'field', header: 'Access Code' }];

  return (
    <Row>
        <div className="d-flex flex-column gap2">
            <Button className='rounded' variant="success" label='Generate Access Code' />
            <Grid columns={codeColumns} />
        </div>
    </Row>
  )
}

export default AccessCode