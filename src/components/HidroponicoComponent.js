import React, { useState, useEffect } from "react";
import "./Hidroponico.css";
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

  const sendStEc = async () => {
    try {
      const response = await fetch("http://localhost:8000/st_hidroponic_ec");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendStPh = async () => {
    try {
      const response = await fetch("http://localhost:8000/st_hidroponic_ph");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendStTemperatura = async () => {
    try {
      const response = await fetch("http://localhost:8000/st_hidroponic_temperatura");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
  <div class="container">
    <div class="content-hidro">
      <h2>Hidropónico</h2>
      <p>status: {isConnected ? "connected" : "disconnected"}</p>
      <p>EC: {sensorECData}</p>
      <p>PH: {sensorPHData}</p>
      <p>Temperatura: {sensorTemperaturaData}</p>
      <button style={{ backgroundColor: buttonColor }} onClick={toogleRele}>
        Rele
      </button>
    </div>
    <div class="setpoints-section">
    <h2>Setpoints</h2>
    <div class="setpoint">
      <label for="setpoint1">EC:</label>
      <div class="input-button-container">
        <input type="text" id="setpoint1" placeholder="Ingrese un valor" />
        <button class="setpoint-button" onClick={sendStEc}>Enviar</button>
      </div>
    </div>
    <div class="setpoint">
      <label for="setpoint2">PH:</label>
      <div class="input-button-container">
        <input type="text" id="setpoint2" placeholder="Ingrese un valor" />
        <button class="setpoint-button" onClick={sendStPh}>Enviar</button>
      </div>
    </div>
    <div class="setpoint">
      <label for="setpoint3">Temperatura:</label>
      <div class="input-button-container">
        <input type="text" id="setpoint3" placeholder="Ingrese un valor" />
        <button class="setpoint-button" onClick={sendStTemperatura}>Enviar</button>
      </div>
    </div>
  </div>
  </div>
  );
}

export default HidroponicoComponent;
