import React, { useState, useEffect } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useSelector, useDispatch } from 'react-redux';
import { getAllBoats } from '../redux/actions/boatsAction';
import { deleteBoat } from '../redux/actions/boatsAction';
import { Row, Col, DatePicker, Button } from 'antd';
import { Popconfirm, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import moment from 'moment';
const { RangePicker } = DatePicker
function AdminHome() {
    const { cars } = useSelector(state => state.boatsReducer)
    const { loading } = useSelector(state => state.alertsReducer)
    const [totalCars, setTotalCars] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllBoats())

    }, [])

    useEffect(() => {
        setTotalCars(cars)
    }, [cars])





    return (
        <DefaultLayout>

            <Row justify='center' gutter={16} className='mt-4' >
                <Col lg={20} sm={24} >
                    <div className='d-flex justify-content-between align-items-center'>
                        <h3 className='mt-1 mr-2' >Admin Panel</h3>
                        <Button className='btn1' > <Link to='/addboat'>ADD BOATS</Link> </Button>
                    </div>
                </Col>
            </Row>


            {loading == true && (<Spinner />)}

            <Row justify='center' gutter={16} >
                {totalCars.map(car => {
                    return <Col lg={5} sm={24} xs={24}>
                        <div className='car p-2 bs1'>
                            <img src={car.image} className='carimg' alt="img" />
                            <div className='car-content d-flex align-items-center justify-content-between'>
                                <div className='text-left pl-2' >
                                    <p>{car.name}</p>
                                    <p>Rent Per Hour Rs.{car.rentPerHour}/-</p>
                                </div>
                                {localStorage.getItem('user') && (
                                    <div className='mr-4' >
                                        <Link to={`/editboat/${car._id}`}><EditOutlined className='mr-3' style={{ color: 'green', cursor: 'pointer' }} /></Link>
                                        <Popconfirm
                                            title="Are you sure to delete this car?"
                                            onConfirm={()=>{dispatch(deleteBoat({ carid : car._id }))}}
                                            
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} />
                                        </Popconfirm>

                                        
                                    </div>
                                )}
                                {!localStorage.getItem('user') && (
                                    <Link to="/login"> <button className='btn1 mr-2' > Login to Book </button> </Link>
                                )}
                            </div>
                        </div>

                    </Col>
                })}
            </Row>

        </DefaultLayout>
    )
}

export default AdminHome
