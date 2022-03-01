import { Col, Row, Form, Input } from 'antd';

import React from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useDispatch, useSelector } from 'react-redux';
import { addBoat } from '../redux/actions/boatsAction';
import Spinner from '../components/Spinner';
function AddBoat() {

    const dispatch = useDispatch();
    const {loading} = useSelector(state=>state.alertsReducer)

    function onFinish(values){
        values.bookedTimeSlots=[]
        dispatch(addBoat(values))
        console.log(values)
    }

    return (
        <DefaultLayout>
            {loading && (<Spinner />) }
            <Row justify='center' className='mt-5' >
                <Col lg={12} sm={24} xs={24} className='p-2' >
                    <Form className='bs1 p-2' layout='vertical' onFinish={onFinish} >
                        <h3>Add New Boat</h3>
                        <hr></hr>
                        <Form.Item name='name' label='Car Name' rules={[{ required: true }]} >
                            <Input />
                        </Form.Item>
                        <Form.Item name='image' label='Image Url' rules={[{ required: true }]} >
                            <Input />
                        </Form.Item>
                        <Form.Item name='rentPerHour' label='Rent Per Hour' rules={[{ required: true }]} >
                            <Input />
                        </Form.Item>
                        <Form.Item name='capacity' label='Capacity' rules={[{ required: true }]} >
                            <Input />
                        </Form.Item>
                        <Form.Item name='fuelType' label='Fuel Type' rules={[{ required: true }]} >
                            <Input />
                        </Form.Item>
                        <div className='text-right'>

                            <button className='btn1 ' >ADD BOAT</button>
                        </div>

                    </Form>
                </Col>
            </Row>
        </DefaultLayout>
    );
}

export default AddBoat;
