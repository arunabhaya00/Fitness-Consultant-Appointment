import React, { useState, useEffect } from "react";
import Layout from '../components/Layout';
import axios from "axios";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker, message } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import '../styles/BookingPage.css';


const BookingPage = () => {

    const { user } = useSelector(state => state.user);
    const params = useParams();
    const [fitnessConsultants, setFitnessConsultants] = useState([]);
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [isAvailable, setIsAvailable] = useState(false);
    const dispatch = useDispatch();

    // login User Data
    const getUserdata = async () => {
        try {
            const res = await axios.post(
                '/api/v1/fitness-consultant/getFitnessConsultantById',
                { fitnessConsultantId: params.fitnessConsultantId },
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                }
            );
            if (res.data.success) {
                setFitnessConsultants(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    //*************** booking function *************/

    const handleBooking = async () => {
        try {

            setIsAvailable(true);
            if(!date && !time){
                return alert('Date & Time Required');
            }
            dispatch(showLoading());
            const res = await axios.post(
                '/api/v1/user/book-appointment',
                {
                    fitnessConsultantId: params.fitnessConsultantId,
                    userId: user._id,
                    fitnessConsultantInfo: fitnessConsultants,
                    date: date,
                    userInfo: user,
                    time: time
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                }
            );
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    };

  
    //Availability

    const handleAvailability = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post(
                '/api/v1/user/book-availability',
                {
                    fitnessConsultantId: params.fitnessConsultantId,
                    date,
                    time
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                }
            );
            dispatch(hideLoading());
            if (res.data.success) {
                
                setIsAvailable(true);
                message.success(res.data.message);
            }else{
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    };






    useEffect(() => {
        getUserdata();
    }, [getUserdata]);

    return (
        <Layout>
            
            <div  className='background-image4'>
            <h3 className='text-center m-3'>Booking Page</h3>
            <div className="container m-2">
                {fitnessConsultants && (
                    <div>
                        <h4>Spt. {fitnessConsultants.firstName} {fitnessConsultants.lastName}</h4>
                        <h4>Fees : {fitnessConsultants.feesPerConsutation}</h4>

                        {fitnessConsultants.timings && fitnessConsultants.timings.length > 0 && (
                            <h4>Available : {fitnessConsultants.timings[0]} - {fitnessConsultants.timings[1]} </h4>
                        )}

                        <div className="d-flex flex-column w-50">
                            <DatePicker
                                aria-required={'true'}
                                className="m-2"
                                format='DD-MM-YYYY'
                                onChange={(value)=>{
                                    setDate(moment(value).format('DD-MM-YYYY'));
                                }}
                                    
                            />
                            <TimePicker
                                aria-required={'true'}
                                className="m-2"
                                format="HH:mm"
                                onChange={(values) => {

                                    setTime(moment(values).format("HH:mm"))
                                   
                                }
                                    
                                    }
                            />
                            <button className="btn btn-dark mt-2" onClick={handleAvailability}>Check Availability</button>
                            <button className="btn btn-dark mt-2" onClick={handleBooking}>Book Now</button>
                        </div>
                    </div>
                )}
            </div>
                
            </div>
        </Layout>
    );
};

export default BookingPage;
