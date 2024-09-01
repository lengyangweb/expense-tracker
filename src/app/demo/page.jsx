"use client";

import React, { useState } from 'react'
import DemoHeader from './components/DemoHeader'
import { Col, Container, Form, Row } from 'react-bootstrap'
import TrackerList from '../tracker/components/TrackerList'
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const page = () => {
    const [trackers, setTrackers] = useState([
        { id: 1, title: 'Tracker 1', createdAt: new Date() },
        { id: 2, title: 'Tracker 2', createdAt: new Date() },
        { id: 3, title: 'Tracker 3', createdAt: new Date() },
    ]);
    const [isLoading, setLoading] = useState(false);
    const [selected, setSelected] = useState(undefined);

  return (
    <Container fluid className='p-3'>
        <Row>
            <Col xs={12}>
                <DemoHeader />
            </Col>
            <Col xs={12}>
                <Row>
                    <Col xs={5}>
                        <Row>
                            <Col xs={12}>
                                <Card title="Add Tracker Form">
                                    <Form>
                                        <div className='d-flex flex-column'>
                                            <Form.Label>Tracker Title:</Form.Label>
                                            <InputText
                                                className='py-2'
                                            />
                                        </div>
                                        <Button
                                            className='rounded-3 w-100 mt-3'
                                            type='submit'
                                            label='Add'
                                            severity='success'
                                        />
                                    </Form>
                                </Card>
                            </Col>
                            <Col xs={12} className='mt-2'>
                                <TrackerList 
                                    isLoading={isLoading}
                                    trackers={JSON.parse(JSON.stringify(trackers))} 
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={7}></Col>
                </Row>
            </Col>
        </Row>
    </Container>
  )
}

export default page