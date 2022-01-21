import React from 'react'
import { Row, Col, Menu, Dropdown, Button } from 'antd';
import { Link } from 'react-router-dom';
import { CarOutlined } from '@ant-design/icons';


function DefaultLayout(props) {
    const user = JSON.parse(localStorage.getItem('user'))
    const menu = (
        <Menu>
          <Menu.Item>
            <a href="/">
              Home
            </a>
          </Menu.Item>
          <Menu.Item>
            <a href="/admin">
              Admin
            </a>
          </Menu.Item>
          <Menu.Item>
            <a href="/userbookings">
              Bookings
            </a>
          </Menu.Item>
          <Menu.Item onClick={()=>{
              localStorage.removeItem('user');
              window.location.href="/login"
          }} >
            <li style={{ color : 'orangered' }} >Logout</li>
          </Menu.Item>
        </Menu>
      );
    return (
        <div>
            <div className="header bs1">
                <Row gutter={16} justify='center' >
                    <Col lg={20} sm={24} xs={24} >
                        <div className="d-flex justify-content-between">
                            <Link to="/"> <b><h1 style={{ color:'orangered' }} ><CarOutlined  /> RahulRentals</h1></b> </Link>
                            {localStorage.getItem('user') && (
                                <Dropdown overlay={menu} placement="bottomCenter">
                                <Button> {user.username} </Button>
                            </Dropdown>
                            )} 
                            {!localStorage.getItem('user') && (
                                
                                <Button> <Link to="/login">Login</Link> </Button>
                            
                            )} 
                                
                    
                        </div>
                    </Col>
                </Row>
                
            </div>
            <div className="content">
                {props.children}
            </div>
            <div className='footer text-center'>
            <hr />
              <p>Designed and Developed By</p>
             
              <p>Rahul Singh</p>
            </div>
        </div>
    )
}

export default DefaultLayout
