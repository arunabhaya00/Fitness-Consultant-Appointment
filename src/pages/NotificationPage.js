import React from "react";
import Layout from "../components/Layout";
import { Tabs, message } from 'antd'
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/NotificationPage.css';

const NotificationPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(state => state.user);

    // handle read notification
    const handleMarkAllRead = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post(
                '/api/v1/user/get-all-notification',
                { userId: user._id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            dispatch(hideLoading());

            if (res.data.success) {
                message.success(res.data.message);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            message.error('Something went wrong.');
        }
    };

    // delete notification
    const handleDeleteAllRead = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post(
                '/api/v1/user/delete-all-notification',
                { userId: user._id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            dispatch(hideLoading());

            if (res.data.success) {
                message.success(res.data.message);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            message.error('Something went wrong.');
        }
    };

    return (
        <Layout>
            <div  className='background-image4'>
            <h4 className="p-3 text-center">Notification Page</h4>
            <Tabs>
                <Tabs.TabPane tab="UnRead" key={0}>
                    <div className="d-flex justify-content-end">
                        <h4 className="p-2 text-primary" style={{ cursor: 'pointer' }} onClick={handleMarkAllRead}>
                            Mark All Read
                        </h4>
                    </div>
                    {user?.notification.length === 0 ? (
                        <p>No unread notifications.</p>
                    ) : (
                        user?.notification.map((notificationMsg, index) => (
                            <div key={index} className="card" style={{ cursor: 'pointer' }}>
                                <div className="card-text" onClick={() => navigate(notificationMsg.onClickPath)}>
                                    {notificationMsg.message}
                                </div>
                            </div>
                        ))
                    )}
                </Tabs.TabPane>
                <Tabs.TabPane tab="Read" key={1}>
                    <div className="d-flex justify-content-end">
                        <h4 className="p-2 text-primary" style={{ cursor: 'pointer' }} onClick={handleDeleteAllRead}>
                            Delete All Read
                        </h4>
                    </div>
                    {user?.seennotification.length === 0 ? (
                        <p>No read notifications.</p>
                    ) : (
                        user?.seennotification.map((notificationMsg, index) => (
                            <div key={index} className="card" style={{ cursor: 'pointer' }}>
                                <div className="card-text" onClick={() => navigate(notificationMsg.onClickPath)}>
                                    {notificationMsg.message}
                                </div>
                            </div>
                        ))
                    )}
                </Tabs.TabPane>
            </Tabs>
            </div>
        </Layout>
    );
}

export default NotificationPage;
