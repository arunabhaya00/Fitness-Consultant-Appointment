import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { Row, Input } from 'antd';
import FitnessConsultantList from '../components/FitnessConsultantList';
import '../styles/HomePage.css';

const HomePage = () => {
    const [fitnessConsultants, setFitnessConsultants] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const getUserdata = async () => {
        try {
            const res = await axios.get(
                '/api/v1/user/getAllFitnessConsultants',
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

    useEffect(() => {
        getUserdata();
    }, []);

    const filteredFitnessConsultants = fitnessConsultants.filter(fitnessConsultant =>
        Object.values(fitnessConsultant).some(value =>
            typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    return (
        <Layout>
            <div className='background-image1'>
                <h2 className='text-center m-3'>Home Page</h2>
                <div className="search-bar">
                    <Input
                        placeholder="Search Fitness Consultants"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {/* You can add a search button here if needed */}
                    {/* <button>Search</button> */}
                </div>
                <Row>
                    {filteredFitnessConsultants.map((fitnessConsultant, index) => (
                        <FitnessConsultantList key={index} fitnessConsultant={fitnessConsultant} />
                    ))}
                </Row>
            </div>
        </Layout>
    );
};

export default HomePage;
