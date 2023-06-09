import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

function HidroponicoComponent() {
  const socket = io('http://localhost:8000', {
});
  const [sensorTemperaturaData, setSensorTemperaturaData] = useState();
  const [sensorECData, setSensorECData] = useState();
  const [sensorPHData, setSensorPHData] = useState();
  const [isConnected, setIsConnected] = useState(socket.connected);
  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(socket.connected);
    });
    socket.on("disconnect", () => {
      setIsConnected(socket.connected);
    });
    socket.on('message', (data) => {
      console.log(data);
      if (data.sensor === 'hidroponico'){
        setSensorTemperaturaData(data.temperatura);
        setSensorECData(data.ec);
        setSensorPHData(data.ph);
        setSensorECData(data.value);
      } 
    });
  }, []);

  return (
    <div>
      <h2>Hidropónico</h2>
      <p>status: {isConnected ? "connected" : "disconnected"}</p>
      <p>EC: {sensorECData}</p>
      <p>PH: {sensorPHData}</p>
      <p>Temperatura: {sensorTemperaturaData} </p>
    </div>
  );
}

export default HidroponicoComponent;
