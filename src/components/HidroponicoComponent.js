import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

function HidroponicoComponent() {
  const socket = io('http://localhost:8000', {
});
  const [sensorTemperaturaData, setSensorTemperaturaData] = useState();
  const [sensorECData, setSensorECData] = useState();
  const [sensorPHData, setSensorPHData] = useState();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [buttonColor, setButtonColor] = useState("red");

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

  const toogleRele = async () => {
    try {
      const response = await fetch("http://localhost:8000/rele");
      const data = await response.json();
      console.log(data);
      if (data.rele1_pin1 === 1) {
        setButtonColor("green");
      }
      if (data.rele1_pin1 === 0) {
        setButtonColor("red");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Hidropónico</h2>
      <p>status: {isConnected ? "connected" : "disconnected"}</p>
      <p>EC: {sensorECData}</p>
      <p>PH: {sensorPHData}</p>
      <p>Temperatura: {sensorTemperaturaData} </p>
      <button style={{ backgroundColor: buttonColor }} onClick={toogleRele}>
        Rele
      </button>
    </div>
  );
}

export default HidroponicoComponent;
