import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

function SensoresComponent() {
  const socket = io('http://localhost:8000', {
});
  const [sensorTemperaturaData, setSensorTemperaturaData] = useState();
  const [sensorHumedadData, setSensorHumedadData] = useState();
  const [sensorCO2Data, setSensorCO2Data] = useState();
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
      if (data.sensor === 'scd40'){
        setSensorTemperaturaData(data.temperatura);
        setSensorHumedadData(data.humedad);
        setSensorCO2Data(data.Co2);
      }
    });
  }, []);
  return (
    <div>
      <h2>Sensores</h2>
      <p>status: {isConnected ? "connected" : "disconnected"}</p>
      <p>Temperatura: {sensorTemperaturaData}</p>
      <p>CO2: {sensorCO2Data}</p>
      <p>Humedad: {sensorHumedadData}</p>
    </div>
  );
}

export default SensoresComponent;