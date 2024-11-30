import React from 'react';
import '../styles/RegisterStyles.css';
import { Form, Input, message } from 'antd';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());

      const response = await axios.post('/api/v1/user/login', values);
      window.location.reload();

      dispatch(hideLoading());

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        message.success('Login Successful');

        // Navigate to the desired page using React Router
        navigate('/');
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('Something went wrong');
    }
  };

  return (
    <div className="form-container">
      <Form layout="vertical" onFinish={onFinishHandler} className="register-form">
        <h2 className="text-center" style={{ color: 'white' }}>Login Form</h2>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input type="password" />
        </Form.Item>

        <Link to="/register" className="m-3">
          Not a User? Register Here
        </Link>

        <button className="btn btn-secondary" type="submit">
          Login
        </button>
      </Form>
    </div>
  );
};

export default Login;
