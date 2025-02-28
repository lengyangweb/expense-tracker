import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const Confirm = ({ 
  show, 
  setShow, 
  handleShow, 
  handleClose,
  title,
  message,
  action,
  cancelText,
  confirmText
}) => {

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>{ cancelText ?? 'Cancel' }</Button>
          <Button variant="primary" onClick={action}>{ confirmText ?? 'Confirm' }</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Confirm