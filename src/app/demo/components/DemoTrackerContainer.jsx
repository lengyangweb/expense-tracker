import React from 'react'
import { Button } from 'primereact/button'
import { Col, Row } from 'react-bootstrap'
import DemoTrackerForm from './DemoTrackerForm'
import TrackerList from '@/app/tracker/components/TrackerList'
import { toast } from 'react-toastify'

const DemoTrackerContainer = ({ 
    isLoading, 
    trackers, 
    selected, 
    setSelected,
    setTrackers,
}) => {

    function removeTracker() {
        const updatedTracker = trackers.filter((tracker) => tracker.title !== selected?.title);
        localStorage.setItem('trackers', JSON.stringify(updatedTracker));
        toast.success(`Tracker Removed`);
        setTrackers((prev) => prev = updatedTracker);
    }

    return (
        <Row>
            <Col xs={12}>
                <Row>
                    <Col xs={12}>
                        <DemoTrackerForm setTrackers={setTrackers} />
                    </Col>
                    <Col xs={12} className='mt-2'>
                        <TrackerList
                            isLoading={isLoading}
                            trackers={JSON.parse(JSON.stringify(trackers))} 
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Col>
                    { selected && (
                        <Col xs={12}>
                            <Button
                                className='rounded-3 w-100 mt-3'
                                label={`Remove ${selected?.title}`}
                                severity='danger'
                                onClick={removeTracker}
                            />
                        </Col>
                    )}
                </Row>
            </Col>
        </Row>
    )
}

export default DemoTrackerContainer