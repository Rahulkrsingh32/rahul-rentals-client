import { message } from 'antd';
import axios from 'axios';

export const getAllBoats = () => async dispatch=>{
    dispatch({ type: 'LOADING', payload:true })

    try{
        const response = await axios.get('/api/cars/getallcars')
        dispatch({type: 'GET_ALL_CARS', payload: response.data})
        dispatch({ type: 'LOADING', payload:false })
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload:false })
    }
}

export const addBoat=(reqObj)=>async dispatch=>{
    dispatch({ type: 'LOADING', payload:true })

    try{
        await axios.post('/api/cars/addcar', reqObj)
       
        dispatch({ type: 'LOADING', payload:false })
        message.success('New Boat Added Successfully')
        setTimeout(()=> {
            window.location.href='/admin'
        }, 500);
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload:false })
    }
}

export const editBoat=(reqObj)=>async dispatch=>{
    dispatch({ type: 'LOADING', payload:true })

    try{
        await axios.post('/api/cars/editcar', reqObj)
       
        dispatch({ type: 'LOADING', payload:false })
        message.success('Boat details updated Successfully')
        setTimeout(()=> {
            window.location.href='/admin'
        }, 500);
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload:false })
    }
}

export const deleteBoat=(reqObj)=>async dispatch=>{
    dispatch({ type: 'LOADING', payload:true })

    try{
        await axios.post('/api/cars/deletecar', reqObj)
       
        dispatch({ type: 'LOADING', payload:false })
        message.success('Boat deleted Successfully')
        setTimeout(()=> {
            window.location.reload()
        }, 500);
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload:false })
    }
}