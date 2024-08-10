import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSocketContext } from './SocketContext';
import { FaHeart, FaUser } from 'react-icons/fa';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationContextProvider = ({ children }) => {
    const { socket } = useSocketContext(); // Move this inside the component
    const [notificationCount, setNotificationCount] = useState(0);

    const showNotification = (message, count, type) => {
        setNotificationCount(count);
        if (type == "like") {
            toast(message, {
                icon: <FaHeart className='w-7 h-7 text-red-500' />,
            });
            console.log('notification', notificationCount)
        }

        else {
            toast(message, {
                icon: <FaUser className='w-7 h-7 text-primary' />,
            });
            console.log('notification', notificationCount)
        }

    };

    useEffect(() => {
        if (socket) {
            const handleNewNotification = (data) => {
                showNotification(data.message, data.count, data.type);
            };

            socket.on('new-notification', handleNewNotification);

            return () => {
                socket.off('new-notification', handleNewNotification);
            };
        }
    }, [socket]);

    return (
        <NotificationContext.Provider value={{ notificationCount, setNotificationCount }}>
            {children}
        </NotificationContext.Provider>
    );
};
