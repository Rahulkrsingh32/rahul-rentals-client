import React, {useState, useEffect} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useSelector, useDispatch } from 'react-redux';
import { getAllCars } from '../redux/actions/carsAction';
import {  Row, Col, DatePicker } from 'antd';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import moment from 'moment';
const { RangePicker } = DatePicker
function Home() {
    const {cars} = useSelector(state=>state.carsReducer)
    const {loading} = useSelector(state=>state.alertsReducer)
    const [totalCars, setTotalCars] = useState([])
    const dispatch = useDispatch()

useEffect(() => {
        dispatch(getAllCars())
    
},[])

useEffect(() => {
    setTotalCars(cars)
}, [cars])



function setFilter(values){
    console.log(values)
    var selectedFrom = moment(values[0], 'MMM DD YYYY HH:mm')
        var selectedTo = moment(values[1], 'MMM DD YYYY HH:mm')
    var temp=[]

    for(var car of cars){

        
        if(car.bookedTimeSlots.length == 0){
            temp.push(car)
        } else {
            for(var booking of car.bookedTimeSlots){
                if(selectedFrom.isBetween(booking.from, booking.to) || 
                    selectedTo.isBetween(booking.from, booking.to) || 
                    moment(booking.from).isBetween(selectedFrom, selectedTo) ||
                    moment(booking.to).isBetween(selectedFrom, selectedTo)
                    ){
                            
                }  else {
                    temp.push(car)
                }
            }
        }
    }
    setTotalCars(temp)


}

    return (
        <DefaultLayout>

            <Row className='mt-5' justify='center' >
                <Col lg={22} sm={24}  >
                    <RangePicker showTime={{ format: 'HH:mm' }} format='MMM DD YYYY HH:mm'  onChange={setFilter}  />
                </Col>
            </Row>

            {loading == true && (<Spinner />)}

            <Row justify='center' gutter={16} >
                {totalCars.map(car=>{
                    return <Col lg={5} sm={24} xs={24}>
                        <div className='car p-2 bs1'>
                            <img src={car.image} className='carimg' alt="img"/>
                            <div className='car-content d-flex align-items-center justify-content-between'>
                                <div className='text-left pl-2' >
                                    <p>{car.name}</p>
                                    <p>Rent Per Hour Rs.{car.rentPerHour}/-</p>
                                </div>
                                {localStorage.getItem('user') && (
                                <div>
                                    <button className='btn1 mr-2' > <Link to={`/booking/${car._id}`}>Book Now</Link> </button>
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

export default Home
