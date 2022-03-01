import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout'
import { useParams } from "react-router-dom";
import { getAllBoats } from '../redux/actions/boatsAction';
import { bookBoat } from '../redux/actions/bookingAction';
import { Col, Row, Divider, DatePicker, Checkbox, Modal } from 'antd';
import Spinner from '../components/Spinner';
import moment from 'moment';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

// ..
AOS.init();
/* import StripeCheckout from 'react-stripe-checkout'; */

const {RangePicker} = DatePicker
function BookingBoat() {
    const params = useParams();

    const {cars} = useSelector(state=>state.boatsReducer)
    const {loading} = useSelector(state=>state.alertsReducer)
    const [car, setCar] = useState({})
    const [from, setFrom] = useState()
    const [to, setTo] = useState()
    const dispatch = useDispatch()
    const [totalHours, setTotalHours] = useState(0)
    const [driver, setDriver] = useState(false)
    const [totalAmount, setTotalAmount] = useState(0)
    const [showModal, setShowModal] = useState(false)

useEffect(() => {
        if(cars.length==0){
            dispatch(getAllBoats())
        }else {
            setCar(cars.find(o=>o._id==params.carid))
        }
}, [cars])

useEffect(() => {
    setTotalAmount((totalHours * car.rentPerHour) )
    if(driver){
        setTotalAmount(totalAmount+(100*totalHours))
    }
}, [driver , totalHours])

function selectTimeSlots(values){
    
    setFrom(moment(values[0]).format('MMM DD YYYY HH:mm'))
    setTo(moment(values[1]).format('MMM DD YYYY HH:mm'))
    setTotalHours(values[1].diff(values[0], 'hours'))
}
 
function bookNow(){
    const reqObj = {
        user : JSON.parse(localStorage.getItem('user'))._id ,
        car : car._id,
        totalHours,
        totalAmount,
        driverRequired : driver ,
        bookedTimeSlots : {
            from,
            to
        },
    };

    dispatch(bookBoat(reqObj));
}


function onToken(token){
    console.log(token)
    
    
}
    
    return (
        <DefaultLayout>
            {/* <h1>Booking car</h1>
            <h1>Car Name = {car.name} </h1>
            <h1>Car Id = {params.carid} </h1> */}
            {loading && ( <Spinner /> )}
            <Row justify='center' className='d-flex align-items-center' style={{ minHeight: '90vh' }} >
                <Col lg={10} sm={24} xs={24} className='p-3' >
                    <img src={car.image} data-aos='flip-left' data-aos-duration='1500' className="carimg2 bs1 " />
                </Col>

                <Col lg={10} sm={24} xs={24} className='text-right' >
                    <Divider type='horizontal' style={{ fontWeight:"bold" }} > <b>Boat Info</b> </Divider>
                    <div  >
                        <p> {car.name} </p>
                        <p> {car.rentPerHour}/- Rent Per Hour </p>
                        <p> Fuel : {car.fuelType} </p>
                        <p> Max Persons : {car.capacity} </p>
                    </div>
                    <Divider type='horizontal' > <b>Select Time Slots</b> </Divider>
                    <RangePicker showTime={{ format: 'HH:mm' }} format='MMM DD YYYY HH:mm' onChange={selectTimeSlots} />
                    <br />

                    <button className='btn1 mt-3' onClick={()=>{ setShowModal(true) }} > See Booked Slots </button>
                    {from && to && (
                        <div>
                        <p>Total Hours : <b>{totalHours}</b> </p>
                        <p>Rent Per Hour : {<b> {car.rentPerHour} </b>} </p>
                        <Checkbox onChange={(e)=>{
                            if(e.target.checked){
                                setDriver(true)
                            } else {
                                setDriver(false)
                            }
                        }} >Driver Required</Checkbox>

                        <h3>Total Amount : {totalAmount} </h3>
                        {/* <StripeCheckout
                        shippingAddress
                            token={onToken}
                            currency='inr'
                            amount={totalAmount *100}
                            stripeKey="pk_test_51KJaH1SBYEO4mMHRiNPjnsU0T5So0NNCz3HPk1YLzq7N0ml1tHpv9OK7gVtAFBDbz0Vz1OzhdFlMkmA97OWCVTob00K4IYWMtB"    
                        >
            
                        </StripeCheckout> */}
                        <button className='btn1' onClick={bookNow} >Book Now</button>
                        
                    </div>
                    )}
                    
                </Col> 
                { car.name && (
                    <Modal visible={ showModal } closable={false} footer={false} title='Booked Time Slots' >
                    <div className='p-2' >
                        {car.bookedTimeSlots.map(slot=>{
                            return <button className='btn1 mt-3' > {slot.from} - {slot.to} </button>
                        })}
                    </div>
                    <div className='text-right mt-5' >
                        <button className='btn1' onClick={()=> {setShowModal(false)} } >Close</button>
                    </div>
    
                </Modal>
                ) }
            </Row>

            
                
            
        </DefaultLayout>
            
        
    )
}

export default BookingBoat
