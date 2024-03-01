import React, { useState } from 'react'
import { Button, Col, Form, FormControl, Modal } from 'react-bootstrap'

const CreateTrackerModal = ({ show, handleClose, action }) => {
  const [title, setTitle] = useState();
  const [error, setError] = useState();

  const handleSave = async () => {
    if (!title) return setError(`Please enter a title`);
    action({ title });

    setTitle();
    setError();
    handleClose();
  }

  const handleOnClose = () => {
    setError();
    handleClose();
  }

  return (
    <Modal         
      show={show}
      onHide={handleOnClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Create New Tracker</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label htmlFor='title'>Title:</Form.Label>
            <FormControl 
              id="title"
              name="title" 
              type='text' 
              placeholder='January Tracker' 
              autoComplete='title'
              onChange={(e) => setTitle(e.target.value)}
              />
              {error && <span className='mx-1 text-danger'>{error}</span>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Col xs={12}>
          <div className="d-flex justify-content-center">
            <Button variant="success" onClick={handleSave}>Save</Button>
          </div>
        </Col>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateTrackerModal