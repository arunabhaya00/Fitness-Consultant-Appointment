import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import { Table, message } from 'antd';
import '../../styles/FitnessConsultants.css';

const FitnessConsultants = () => {
  const [fitnessConsultants, setFitnessConsultants] = useState([]);

  const getFitnessConsultants = async () => {
    try {
      const res = await axios.get('/api/v1/admin/getAllFitnessConsultants', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.data.success) {
        setFitnessConsultants(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFitnessConsultants();
  }, []);

  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        '/api/v1/admin/changeAccountStatus',
        { fitnessConsultantId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      message.error('Something went wrong');
    }
  };

  const handleDelete = async (record) => {
    try {
      const res = await axios.post(
        '/api/v1/admin/deleteFitnessConsultant',
        { fitnessConsultantId: record._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (res.data.success) {
        message.success(res.data.message);
        getFitnessConsultants(); // Refresh the list after deletion
      }
    } catch (error) {
      message.error('Something went wrong');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => (
        <span>{record.firstName} {record.lastName}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className='d-flex'>
          {record.status === 'pending' ? (
            <button className='btn btn-success' onClick={() => handleAccountStatus(record, 'approved')}>Approve</button>
          ) : (
            <>
              <button className='btn btn-secondary m-2' onClick={() => handleAccountStatus(record, 'rejected')}>Reject</button>
              <button className='btn btn-dark m-2' onClick={() => handleDelete(record)}>Delete</button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className='background-image'>
        <h2 className='text-center m-3'>Fitness Consultant Directory</h2>
        <Table 
          columns={columns} 
          dataSource={fitnessConsultants} 
          className='transparent-table' 
          
        />
      </div>
    </Layout>
  );
};

export default FitnessConsultants;
