'use client'

import DemoHeader from './DemoHeader';
import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import DemoTrackerContainer from './DemoTrackerContainer';

const DemoContainer = () => {
    const [trackers, setTrackers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [selected, setSelected] = useState(undefined);

    useEffect(() => onLoad, [trackers]);

    function onLoad() {
        loadTrackerData();
    }

    function loadTrackerData () {
        if (!trackers.length) {
            let tempData = JSON.parse(localStorage.getItem('trackers')) || [];
            setTrackers((prev) => prev = tempData);
            setLoading(prev => prev = false);
        }
    }
    
    return (
        <Row>
            <Col xs={12}>
                <DemoHeader />
            </Col>
            <Col xs={5}>
                <DemoTrackerContainer
                    isLoading={isLoading}
                    trackers={JSON.parse(JSON.stringify(trackers))}
                    selected={selected}
                    setSelected={setSelected}
                    setTrackers={setTrackers}
                />
            </Col>
            <Col xs={7}></Col>
        </Row>
    )
}

export default DemoContainer