import { useRef } from 'react'
import { Card } from 'primereact/card'
import { Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'

const DemoTrackerForm = ({ setTrackers }) => {
    const formRef = useRef();

    function addTracker() {
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
        return `We apologize, you can only add 3 trackers as a demo. Please request a login credential if you wish to further use this site.`;
    }

    return (
        <Card title="Add Tracker Form">
            <Form ref={formRef} action={addTracker}>
                <div className='d-flex flex-column'>
                    <Form.Label>Tracker Title:</Form.Label>
                    <div className="d-flex align-items-center gap-2">
                        <InputText
                            className='w-100'
                            name='title'
                            // style={{ height: '50px' }}
                        />
                        <Button
                            className='rounded-3'
                            type='submit'
                            label='Add'
                            severity='success'
                        />
                    </div>
                </div>
            </Form>
        </Card>
    )
}

export default DemoTrackerForm