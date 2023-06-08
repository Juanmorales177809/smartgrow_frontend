import React, {useState, useEffect} from 'react';
import {io} from "socket.io-client";

const socket = io('http://localhost:8000', {
    path: '/sockets'
}); // Connects to socket.io server

export const Hidroponico = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    useEffect(() => {
        socket.on('connect', () => {
          setIsConnected(socket.connected);
        });
    
        socket.on('disconnect', () => {
          setIsConnected(socket.connected);
        });

        socket.on('join', (data) => {
            console.log(data);
        });


      }, []);
    return (<>
        <h2>status: {isConnected ? 'connected' : 'disconnected'}</h2>
        <p>Hidroponico</p>
    </>);

};