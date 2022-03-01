import axios from 'axios';
import { message } from 'antd';
export const bookBoat = (reqObj) => async dispatch=>{
    dispatch({ type: 'LOADING', payload:true })

    try{
        const response = await axios.post('/api/bookings/bookcar', reqObj)
        message.success('Your Boat Booked Successfully!');
        dispatch({ type: 'LOADING', payload:false })
        setTimeout(() => {
            
            window.location.href='/userbookings'
        },500);
        
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload:false })
        message.error('Something went Worng, Please try later Action')
    }
};

export const getAllBookings = () => async dispatch=>{
    dispatch({ type: 'LOADING', payload:true })

    try{
        const response = await axios.get('/api/bookings/getallbookings')
        dispatch({type: 'GET_ALL_BOOKINGS', payload: response.data})
        dispatch({ type: 'LOADING', payload:false })
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload:false })
    }
}