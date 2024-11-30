import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useSelector,useDispatch } from 'react-redux';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import { Col, Form, Input, Row ,TimePicker, message} from "antd";
import {showLoading,hideLoading} from "../../redux/features/alertSlice";
import moment from 'moment'
import '../../styles/Profile.css';


const Profile = () => {
   const { user } = useSelector(state => state.user);
   const [fitnessConsultant, setFitnessConsultant] = useState(null);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const params = useParams();

   //update fitnessConsultant
   //handle form

const handleFinish = async (values) => {
    try {
        dispatch(showLoading());
        const res = await axios.post(
            '/api/v1/fitness-consultant/updateProfile',
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
            message.error(res.data.success);
        }
    } catch (error) {
        dispatch(hideLoading());
        console.log(error);
        message.error('Something Went Wrong');
    }
};



   const getFitnessConsultantInfo = async () => {
      try {
         const res = await axios.post(
            '/api/v1/fitness-consultant/getFitnessConsultantInfo',
            { userId: params.id },
            {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
               },
            }
         );

         if (res.data.success) {
            setFitnessConsultant(res.data.data);
         }
      } catch (error) {
         console.error('Error fetching Fitness Consultant Info:', error);
      }
   };

   useEffect(() => {
      getFitnessConsultantInfo();
      // eslint-disable-next-line
   }, []); 
   return (
      <Layout>
        <div className='background-image8'>
         <h1 className='text-center m-3'>Manage Profile</h1>
         
         {fitnessConsultant && (

    
            <Form layout="vertical" onFinish={handleFinish}  className="m-3"initialValues={{
                ...fitnessConsultant,
                timings:[

                    moment(fitnessConsultant.timings[0],'HH:mm'),
                    moment(fitnessConsultant.timings[1],'HH:mm'),


                ],
                
                }}>
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
                          label="Fees Per Consutation :" 
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
                         name="timings"
                         required>
                    <TimePicker.RangePicker format={"HH:mm"} />
                    </Form.Item>

                    </Col>  
                   
                    <Col xs = {24} md={24} lg={8}></Col>
                    <Col xs = {24} md={24} lg={8}>

                    <button 
                     className="btn btn-dark form-btn" 
                     type="submit">Update
                    </button>
                    </Col>
                </Row>
            </Form>

          )}
          </div>
      </Layout>
   );
};

export default Profile;
