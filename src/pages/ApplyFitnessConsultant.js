import React from "react";
import Layout from "../components/Layout";
import { Col, Form, Input, Row ,TimePicker, message} from "antd";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {showLoading,hideLoading} from "../redux/features/alertSlice";
import axios from 'axios';
import '../styles/ApplyFitnessConsultant.css'


const ApplyFitnessConsultant = () => {

    const{user} = useSelector(state => state.user)


    const dispatch = useDispatch();
    const navigate = useNavigate();
    //handle form

const handleFinish = async (values) => {
    try {
        dispatch(showLoading());
        const res = await axios.post(
            '/api/v1/user/apply-fitness-consultant',
            {
                ...values,
                userId: user._id,
                timings: [
                    values.timings[0].format('HH:mm'),
                    values.timings[1].format('HH:mm'),
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        );
        dispatch(hideLoading());
        if (res.data.success) {
            message.success(res.data.message);
            navigate('/');
        } else {
            message.error(res.data.message);
        }
    } catch (error) {
        dispatch(hideLoading());
        console.log(error);
        message.error('Something Went Wrong');
    }
};


    return(

        <Layout>

            <div className='background-image5'>
            <h1 className="text-center">Apply Fitness Consultant</h1>

            <Form layout="vertical" onFinish={handleFinish}  className="m-3">
            <h4 className="" style={{ color: 'white' }}>Personal Details :</h4>
                <Row gutter={20}>
                    <Col xs = {24} md={24} lg={8}>
                        <Form.Item  
                          label="First Name :" 
                          name="firstName" 
                          required 
                          rules={[{required:true}]}
                          
                        >
                            <Input type="text"  placeholder="your first name"></Input>    
                        </Form.Item> 

                    </Col>
        
                    <Col xs = {24} md={24} lg={8}>
                        <Form.Item  
                          label="Last Name :" 
                          name="lastName" 
                          required 
                          rules={[{required:true}]}
                          
                        >
                            <Input type="text"  placeholder="your last name"></Input>    
                        </Form.Item>  
                    </Col>
                
                    <Col xs = {24} md={24} lg={8}>
                        <Form.Item  
                          label="Phone Number :" 
                          name="phone" 
                          required 
                          rules={[{required:true}]}
                        >
                            <Input type="text"  placeholder="your contact numer"></Input>    
                        </Form.Item> 
                    </Col>
                
                    <Col xs = {24} md={24} lg={8}>
                        <Form.Item  
                          label="E-Mail :" 
                          name="email" 
                          required 
                          rules={[{required:true}]}
                        >
                            <Input type="email"  placeholder="your email address"></Input>    
                        </Form.Item> 
                    </Col>

                    
                    <Col xs = {24} md={24} lg={8}>  
                        <Form.Item  
                          label="Website :" 
                          name="website" 
                          required 
                          rules={[{required:true}]}
                        >
                            <Input type="text"  placeholder="your website"></Input>    
                        </Form.Item>

                    </Col>
                
                    <Col xs = {24} md={24} lg={8}>  
                        <Form.Item  
                          label="Address :" 
                          name="address" 
                          required 
                          rules={[{required:true}]}
                        >
                            <Input type="text"  placeholder="your clinic address"></Input>    
                        </Form.Item>

                    </Col>

                </Row>


                <h4 className="" style={{ color: 'white' }}>Professional Details :</h4>
                <Row gutter={20}>
                    <Col xs = {24} md={24} lg={8}>
                        <Form.Item  
                          label="Specialization :" 
                          name="specialization" 
                          required 
                          rules={[{required:true}]}
                         
                        >
                            <Input type="text"  placeholder="your specialization"></Input>    
                        </Form.Item> 

                    </Col>
        
                    <Col xs = {24} md={24} lg={8}>
                        <Form.Item  
                          label="Experience :" 
                          name="experience" 
                          required 
                          rules={[{required:true}]}
                        >
                            <Input type="text"  placeholder="your experience"></Input>    
                        </Form.Item>  
                    </Col>
                
                    <Col xs = {24} md={24} lg={8}>
                        <Form.Item  
                          label="Fees Per Consultation :" 
                          name="feesPerConsutation" 
                          required 
                          rules={[{required:true}]}
                        >
                            <Input type="text"  placeholder="your Charges"></Input>    
                        </Form.Item> 
                    </Col>
                
                    <Col xs = {24} md={24} lg={8}>
                    <Form.Item  
                         label="Availability :" 
                         name="timings" // Add a name attribute
                         required>
                    <TimePicker.RangePicker format={"HH:mm"} />
                    </Form.Item>

                    </Col>  
                    <Col xs = {24} md={24} lg={8}></Col>
                    <Col xs = {24} md={24} lg={8}>

                    <button 
                     className="btn btn-dark form-btn" 
                     type="submit">Submit
                    </button>
                    </Col>
                </Row>
            </Form>
            </div>
        </Layout>    
        
    )
}

export default ApplyFitnessConsultant;