import React from 'react'
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const DemoRemoveButton = ({ itemTitle, action }) => {
  return (
    <Button variant="outline-danger" onClick={action}>
      <div className="d-flex gap-2 align-items-center">
        <span>Remove {itemTitle}</span>
        <i className="pi pi-trash"></i>
      </div>
    </Button>
  )
}

DemoRemoveButton.prototype = {
  itemTitle: PropTypes.string,
  action: PropTypes.func,
}

export default DemoRemoveButton
