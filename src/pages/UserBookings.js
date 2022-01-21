import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useSelector, useDispatch } from 'react-redux';
import { getAllBookings } from '../redux/actions/bookingAction';
import { Col, Row } from 'antd';
import moment from 'moment';
import Spinner from '../components/Spinner';
function UserBookings() {

    const dispatch = useDispatch()
    const { bookings } = useSelector(state => state.bookingsReducer)
    const { loading } = useSelector(state => state.alertsReducer)
    const user = JSON.parse(localStorage.getItem("user"))
    useEffect(() => {
        dispatch(getAllBookings())
    }, [])

    return (
        <DefaultLayout>
            { loading && ( <Spinner /> ) }

            <h3 className='text-center mt-4'  >My Bookings</h3>
            <Row justify='center' gutter={16} >
                <Col lg={15} sm={24} >

                    
                        {bookings.filter(o=>o.user==user._id).map(booking => {

                           return( <Row gutter={16} className='bs1 mt-4 text-left' >
                                <Col lg={6} sm={24} >
                                    <p><b> { booking.car.name } </b></p>
                                    <p>Total Hours : <b> {booking.totalHours} </b> </p>
                                    <p>Rent Per Hour : <b> {booking.car.rentPerHour} </b> </p>
                                    <p>Total Amount : <b> {booking.totalAmount} </b> </p>
                                </Col>
                                <Col lg={13} sm={24} >
                                <p>Transaction Id : <b> {booking.transactionId} </b> </p>
                                <p>Booked from Time : <b> {booking.bookedTimeSlots.from} </b> </p>
                                <p>Booked to Time : <b> {booking.bookedTimeSlots.to} </b> </p>
                                <p>Date Of Booking : <b> {moment(booking.createdAt).format('MMM DD YYYY')} </b> </p>
                                </Col>
                                <Col lg={5} sm={24} className='text-right' >
                                    <img style={{ borderRadius : "10px" }} src={ booking.car.image } height="140" className='p-2' />
                                </Col>

                            </Row>
                           )

                        })}
                    

                </Col>
            </Row>
        </DefaultLayout>
    )
}

export default UserBookings;
