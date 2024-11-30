import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import { Table } from 'antd';
import '../../styles/Users.css';

const Users = () => {
  const [users, setUsers] = useState([]); 

  // getUsers function 
  const getUsers = async () => {
    try {
      const res = await axios.get('/api/v1/admin/getAllUsers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'EMail',
      dataIndex: 'email',
    },
    {
      title: 'Fitness Consultant',
      dataIndex: 'isFitnessConsultant',
      render: (text, record) => ( <span>{record.isFitnessConsultant ? 'Yes' : 'No'}</span>),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className='d-flex'>
          <button className='btn btn-secondary'>Block</button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className='background-image3'>
      <h2 className='text-center m-3'>User Directory</h2>
      <Table className='transparent-table' columns={columns} dataSource={users} />
      
      </div>
      </Layout>
  );
};

export default Users;
