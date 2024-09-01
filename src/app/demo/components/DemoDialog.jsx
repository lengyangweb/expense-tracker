"use client"

import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import DemoStepper from "./DemoStepper";

export default function DemoDialog() {
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <Button
                className='rounded-4'
                label='See Tutorial'
                onClick={() => setVisible(true)}
            />
            <Dialog header="Tutorial" visible={visible} style={{ width: '75vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
                <DemoStepper />
            </Dialog>
        </div>
    )
}
        