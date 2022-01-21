
import './App.css';
import {Route, Routes, BrowserRouter, Navigate} from 'react-router-dom';
import Home from './pages/Home';
import BookingCar from './pages/BookingCar';
import 'antd/dist/antd.css';
import Register from './pages/Register';
import Login from './pages/Login';
import UserBookings from './pages/UserBookings';
import AddCar from './pages/AddCar';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';


function App() {
  return (
    <div className="App">

      
      
      <BrowserRouter>
        <Routes>
          

          <Route path='/' exact element={ <Home /> } />
          <Route path='/login' exact element={ <Login /> } />
          <Route path='/register' exact element={ <Register /> } />
          <Route path='/booking/:carid' exact element={ <BookingCar /> } />
          <Route path='/userbookings' exact element={ <UserBookings /> } />
          <Route path='/addcar' exact element={ <AddCar /> } />
          <Route path='/admin' exact element={ <AdminHome /> } />
          <Route path='/editcar/:carid' exact element={ <EditCar /> } />
          

        </Routes>
      </BrowserRouter>
    </div> 
  );
}



export default App;

/* export function ProtectedRoute(props){
  if(localStorage.getItem('user')){
    return <Route {...props} />
  } else {
    return <Navigate to='/login' />
  }
} */