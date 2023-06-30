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
  const [buttonColor1, setButtonColor1] = useState("red");
  const [buttonColor2, setButtonColor2] = useState("red");
  const [buttonColor3, setButtonColor3] = useState("red");
  const [setpointEc, setSetpointEc] = useState("");
  const [setpointEcAux, setSetpointEcAux] = useState("");
  const [setpointPh, setSetpointPh] = useState("");
  const [setpointPhAux, setSetpointPhAux] = useState("");
  const [setpointTemperatura, setSetpointTemperatura] = useState("");
  const [setpointTemperaturaAux, setSetpointTemperaturaAux] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(socket.connected);
    });
    socket.on("disconnect", () => {
      setIsConnected(socket.connected);
    });
    socket.on('message', (data) => {
      console.log(data);
      if (data.Sensor === 'hidroponico'){
        setSensorTemperaturaData(data.temperatura_agua1);
        // setSensorECData(data.ec);
        // setSensorPHData(data.ph);
      }
    });
  }, []);

  const toogleRele = async ( rele ) => {
    try {
      const response = await fetch(`http://localhost:8000/rele?rele=${rele}`);
      const data = await response.json();
      console.log(data);
      if (data.rele1_pin1 === 1) {
        setButtonColor1("green");
      }
      if (data.rele1_pin1 === 0) {
        setButtonColor1("red");
      }
      if (data.rele1_pin2 === 1) {
        setButtonColor2("green");
      }
      if (data.rele1_pin2 === 0) {
        setButtonColor2("red");
      }
      if (data.rele2_pin1 === 1) {
        setButtonColor3("green");
      }
      if (data.rele2_pin1 === 0) {
        setButtonColor3("red");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendStEc = async () => {
    setSetpointEcAux(setpointEc);
    console.log(`http://localhost:8000/st_hidroponic_ec/${setpointEc}`);
    // try {
    //   const response = await fetch(`http://localhost:8000/st_hidroponic_ec/${setpointEc}`);
    //   const data = await response.json();
    //   console.log(data);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const sendStPh = async () => {
    try {
      setSetpointPhAux(setpointPh);
      const response = await fetch(`http://localhost:8000/st_hidroponic_ph/${setpointPh}`);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendStTemperatura = async () => {
    try {
      setSetpointTemperaturaAux(setpointTemperatura);
      const response = await fetch(`http://localhost:8000/st_hidroponic_temperatura/${setpointTemperatura}`);
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
      
      <button style={{ backgroundColor: buttonColor1 }} onClick={() => toogleRele("rele1_pin1")}>
        Rele 1 
      </button>
      <button style={{ backgroundColor: buttonColor2 }} onClick={() => toogleRele("rele1_pin2")}>
        Rele 2
      </button>
      <button style={{ backgroundColor: buttonColor3 }} onClick={() => toogleRele("rele2_pin1")}>
        Rele 3 
      </button>
    </div>
    <div class="setpoints-section">
    <h2>Setpoints</h2>
    <div class="setpoint">
      <label for="setpoint1">EC: {setpointEcAux}</label>
      <div class="input-button-container">
        <input type="text" id="setpoint1" placeholder="Ingrese un valor" value={setpointEc} onChange={(e) => setSetpointEc(e.target.value)}/>
        <button class="setpoint-button" onClick={sendStEc}>Enviar</button>
      </div>
    </div>
    <div class="setpoint">
      <label for="setpoint2">PH: {setpointPhAux}</label>
      <div class="input-button-container">
        <input type="text" id="setpoint2" placeholder="Ingrese un valor" value={setpointPh} onChange={(e) => setSetpointPh(e.target.value)} />
        <button class="setpoint-button" onClick={sendStPh}>Enviar</button>
      </div>
    </div>
    <div class="setpoint">
      <label for="setpoint3">Temperatura: {setpointTemperaturaAux}</label>
      <div class="input-button-container">
        <input type="text" id="setpoint3" placeholder="Ingrese un valor" value={setpointTemperatura} onChange = {(e) => setSetpointTemperatura(e.target.value)}/>
        <button class="setpoint-button" onClick={sendStTemperatura}>Enviar</button>
      </div>
    </div>
  </div>
  </div>
  );
}

export default HidroponicoComponent;
