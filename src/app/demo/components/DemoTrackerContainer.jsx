import React from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { Col, Row } from 'react-bootstrap'
import DemoTrackerForm from './DemoTrackerForm'
import DemoRemoveButton from './DemoRemoveButton'
import TrackerList from '@/app/tracker/components/TrackerList'

const DemoTrackerContainer = ({ isLoading, trackers, selected, setSelected, setTrackers }) => {

    function removeTracker() {
        const updatedTracker = trackers.filter((tracker) => tracker.title !== selected?.title);
        localStorage.setItem('trackers', JSON.stringify(updatedTracker));
        toast.success(`Tracker Removed`);
        setSelected( prev => prev = undefined);
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
                        <Col xs={12} className='mt-3'>
                            <DemoRemoveButton 
                                itemTitle={selected?.title} 
                                action={removeTracker}
                            />
                        </Col>
                    )}
                </Row>
            </Col>
        </Row>
    )
}

DemoTrackerContainer.prototype = {
    isLoading: PropTypes.bool, 
    trackers: PropTypes.array, 
    selected: PropTypes.object, 
    setSelected: PropTypes.func, 
    setTrackers: PropTypes.func,
}

export default DemoTrackerContainer