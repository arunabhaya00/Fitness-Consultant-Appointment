import React, { useState ,useEffect} from "react";
import Layout from "../components/Layout";
import axios from "axios";
import moment from "moment";
import { Table } from "antd";
import '../styles/Appointments.css';

const Appointments  = () => {

    const[appointments, setAppointments] = useState([])

    const getAppointments = async() => {

        try{

            const res = await axios.get('/api/v1/user/user-appointments',

            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            })

            if (res.data.success) {
                setAppointments(res.data.data);
            }

        }catch(error){

            console.log(error)
        }
    };

    

    useEffect(() => {
        getAppointments();
    }, []);


    const columns = [{


        title:'ID',
        dataIndex:'_id'
    },
    // {

    //     title:'Name',
    //     dataIndex:'name',
    //     render:(text,record)=>(

    //         <span>
    //             {record.fitnessConsultantId.firstName} {record.fitnessConsultantId.lastName}
    //         </span>
    //     ),
    // },

    // {

    //     title:'Phone',
    //     dataIndex:'phone',
    //     render:(text,record)=>(

    //         <span>
    //             {record.fitnessConsultantInfo.phone}
    //         </span>
    //     ),
    // },
    {

        title:'Date & Time',
        dataIndex:'date',
        render:(text,record)=>(

            <span>
                {moment(record.date).format('DD-MM-YYYY')}
                {moment(record.time).format('HH-mm')}
            </span>
        ),
    },

    {

        title:'Status',
        dataIndex:'status',
        
    },

]

    return(


        <Layout>
            <div className='background-image6'>
            <h1 className='text-center m-3'>Appointment Lists</h1>
            <Table columns={columns} dataSource={appointments} className='transparent-table' >
            
            </Table>
            </div>
        </Layout>


    );
};

export default Appointments;