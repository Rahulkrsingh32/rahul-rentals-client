import { Col, Row, Form, Input } from 'antd';
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useDispatch, useSelector } from 'react-redux';
import { addBoat, editBoat } from '../redux/actions/boatsAction';
import { getAllBoats } from '../redux/actions/boatsAction';
import Spinner from '../components/Spinner';
function EditBoat() {
    const params = useParams();
    const { cars } = useSelector(state => state.boatsReducer)
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.alertsReducer)
    const [car, setCar] = useState()
    const [totalcars, setTotalcars] = useState([])
    useEffect(() => {

        if (cars.length == 0) {
            dispatch(getAllBoats())
        } else {
            setTotalcars(cars)
            setCar(cars.find(o => o._id == params.carid))
        }

    }, [cars])

    function onFinish(values) {
        values._id = car._id

        dispatch(editBoat(values))
        console.log(values)
    }

    return (
        <DefaultLayout>
            {loading && (<Spinner />)}
            <Row justify='center' className='mt-5' >
                <Col lg={12} sm={24} xs={24} className='p-2'>
                    {totalcars.length > 0 && (
                        <Form initialValues={car} className='bs1 p-2' layout='vertical' onFinish={onFinish} >
                            <h3>Edit Car {car.name} </h3>
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

                                <button className='btn1 ' >EDIT BOATS</button>
                            </div>

                        </Form>
                    )}
                </Col>
            </Row>
        </DefaultLayout>
    );
}

export default EditBoat;
