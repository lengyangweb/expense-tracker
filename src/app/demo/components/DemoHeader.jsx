import { Button } from 'primereact/button'
import React from 'react'
import DemoDialog from './DemoDialog'

const DemoHeader = () => {
  return (
    <div>
        <h4>WELCOME!</h4>
        <p>
            This is <strong><i>exp</i>Tracker</strong> demo page where you can have a snippet of how the site works.
        </p>
        <DemoDialog />
        <hr />
    </div>
  )
}

export default DemoHeader