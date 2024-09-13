import { useRef } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'primereact/card'
import { toast } from 'react-toastify'
import { Button, Form } from 'react-bootstrap'
import { InputText } from 'primereact/inputtext'

const DemoTrackerForm = ({ setTrackers }) => {
    const formRef = useRef();

    function addTracker() {
        if (!formRef.current.title.value) return toast.error(`Pleae enter a tracker name`);

        // init new tracker 
        const newTracker = {
            id: Math.floor(Math.random() * (5000_000 - 100_000) + 100_000),
            title: formRef.current.title.value,
            createdAt: new Date()
        }

        let tempData = JSON.parse(localStorage.getItem('trackers')); // get all trackers from localStorage
        tempData = [...tempData, newTracker]; // push new tracker
        // validate tracker result
        const validateResult = validateTrackers(tempData);
        if (validateResult) return toast.error(validateResult);

        // update trackers 
        toast.success(`Tracker Added`);
        localStorage.setItem('trackers', JSON.stringify(tempData)); // updated trackers in localStroage
        setTrackers((prev) => prev = tempData); // update tracker
        formRef.current?.reset(); // reset form
    }

    function validateTrackers(trackers) {
        const isAtLimit = trackers.length > 3;
        if (!isAtLimit) return isAtLimit;
        return `Sorry, you can only add 3 trackers as a demo. Please request a login credential if you wish to further use this site.`;
    }

    return (
        <Card title="Add Tracker Form">
            <Form ref={formRef} action={addTracker}>
                <div className='d-flex flex-column'>
                    <Form.Label>Tracker Title:</Form.Label>
                    <div className="d-flex align-items-center gap-2">
                        <InputText className='w-100' name='title' />
                        <Button className='py-3' type="submit" variant="outline-success">
                            <div className="d-flex gap-2 align-items-center">
                                <i className="pi pi-plus"></i>
                            </div>
                        </Button>
                    </div>
                </div>
            </Form>
        </Card>
    )
}

DemoTrackerForm.prototype = {
    setTracker: PropTypes.func
}

export default DemoTrackerForm