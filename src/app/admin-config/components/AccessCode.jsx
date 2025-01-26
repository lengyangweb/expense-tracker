'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'
import Grid from '@/app/components/Grid/Grid'
import { Button, Col, Row } from 'react-bootstrap'
import { generateAccessCode, removeAccessCode } from '@/app/services/utilities'

const AccessCode = ({ accessCodes }) => {
  const [selectedCode, setSelectedCode] = useState();
  const codeColumns = [{ field: 'code', header: 'Access Code' }];

  async function generateCode() {
    try {
      const result = await generateAccessCode();
      if (!result) return toast.error(result.message);
      if ('success' in result && !result.success) return toast.error(result.message);
      toast.success(result.message);
    } catch (error) {
      console.error(`${new Date().toISOString()} - ${error}`);
      return;
    }
  }

  async function handleRemoveCode() {
    try {
      let codes = accessCodes.filter((accessCode) => accessCode.code !== selectedCode.code);
      codes = codes.map(({ code }) => (code));
      const result = await removeAccessCode(codes);
      if (!result.success) return toast.error(result.message);
      toast.success(result.message);
    } catch (error) {
      return;
    }
  }

  return (
    <Row>
        <div className="d-flex flex-column gap2">
          <Col xs={12}>
            <h5>Generate/Remove Access Code:</h5>
          </Col>
          <Col xs={12}>
            <div className="d-flex gap-2">
              <Button className='btn btn-success' onClick={generateCode}>
                <div className="d-flex align-items-center gap-2">
                  <i className="pi pi-plus"></i>
                  <span>Generate</span>
                </div>
              </Button>
              <Button className='btn btn-danger' onClick={handleRemoveCode} disabled={!selectedCode}>
                <div className="d-flex align-items-center gap-2">
                  <i className="pi pi-trash"></i>
                  <span>Remove</span>
                </div>
              </Button>
            </div>
          </Col>
          <Grid 
            columns={codeColumns} 
            rows={accessCodes}
            selectedRow={selectedCode}
            setRowSelected={setSelectedCode}
            scrollHeight={'250px'}
            footer={true}
          />
        </div>
    </Row>
  )
}

export default AccessCode