import React from 'react'
import { Row, Col, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { userLogin } from '../redux/actions/userActions';
import Spinner from '../components/Spinner';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

// ..
/* https://www.charterworld.com/news/wp-content/uploads/2013/12/Boksa-38M-superyacht-design-Black-Hull.jpg
 */
AOS.init();
function Login() {

    const dispatch = useDispatch()
    const {loading} = useSelector(state=>state.alertsReducer)
    function onFinish(values){
        dispatch(userLogin(values))
        console.log(values);
    }

    return (
        <div className='login'>
            {loading && ( <Spinner /> )}
            <Row gutter={16} className='d-flex align-items-center' >
                <Col lg={16} style={{ position: 'relative' }}>
                    <img data-aos='slide-right' data-aos-duration='1500' style={{height : '80vh' }} src="http://viyonamarine.com/wp-content/uploads/2018/10/Todomar42-Profile-Blue-Hull-black-Background-960x560.jpg" alt="image" />
                    <h1 className='login-logo'>SEA-SENORA</h1>
                </Col>
                <Col lg={8}className='text-left p-5' >
                    <Form layout='vertical' className='login-form p-5' onFinish={onFinish} >
                        <h1>Login</h1>
                        <hr />
                        <Form.Item name='username' label='Username' rules={[{required: true}]} >
                            <Input />
                        </Form.Item>
                        <Form.Item name='password' label='Password' rules={[{required: true}]} >
                            <Input />
                        </Form.Item>
                        <button className='btn1 mt-2 ' >Login</button>
                        <hr />

                        <Link to='/Register'>New member? Click here to Register</Link>
                        
                    </Form>
                </Col>
            </Row>
            
        </div>
    )
}

export default Login
