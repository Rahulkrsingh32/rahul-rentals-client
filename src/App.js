
import './App.css';
import {Route, Routes, BrowserRouter,HashRouter, Navigate} from 'react-router-dom';
import Home from './pages/Home';
import BookingBoat from './pages/BookingBoat';
import 'antd/dist/antd.css';
import Register from './pages/Register';
import Login from './pages/Login';
import UserBookings from './pages/UserBookings';
import AddBoat from './pages/AddBoat';
import AdminHome from './pages/AdminHome';
import EditBoat from './pages/EditBoat';


function App() {
  return (
    <div className="App">

      
      
      <BrowserRouter>
        <Routes>
          

          <Route path='/' exact element={ <Home /> } />
          <Route path='/login' exact element={ <Login /> } />
          <Route path='/register' exact element={ <Register /> } />
          <Route path='/booking/:carid' exact element={ <BookingBoat /> } />
          <Route path='/userbookings' exact element={ <UserBookings /> } />
          <Route path='/addboat' exact element={ <AddBoat /> } />
          <Route path='/admin' exact element={ <AdminHome /> } />
          <Route path='/editboat/:carid' exact element={ <EditBoat /> } />
          

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