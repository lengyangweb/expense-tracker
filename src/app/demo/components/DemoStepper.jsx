
import React, { useRef } from "react";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';

export default function DemoStepper() {
    const stepperRef = useRef(null);

    return (
    <div className="card d-flex justify-content-center">
        <Stepper ref={stepperRef} style={{ flexBasis: '30rem' }}>
            <StepperPanel header="Create Tracker">
                <div className="d-flex flex-column ">
                    <h4>Create Tracker</h4>
                </div>
                <div className="flex pt-4 justify-content-end">
                    <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                </div>
            </StepperPanel>
            <StepperPanel header="Select Tracker">
                <div className="flex flex-column">
                    <h4>Select Tracker</h4>
                </div>
                <div className="d-flex pt-4 justify-content-between">
                    <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                    <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                </div>
            </StepperPanel>
            <StepperPanel header="Create History">
                <div className="d-flex flex-column">
                    <h4>Create History</h4>
                </div>
                <div className="d-flex pt-4 justify-content-start">
                    <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                </div>
            </StepperPanel>
        </Stepper>
    </div>
    )
}
        