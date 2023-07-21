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
  const [tiempoRecirculacion, setTiempoRecirculacion] = useState("");

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
      if(tiempoRecirculacion === ""){
        setTiempoRecirculacion(10000);
      }
      const response = await fetch(`http://localhost:8000/api/v1/rele?rele=${rele}&tiempo_recirculacion=${tiempoRecirculacion}`);
      const data = await response.json();
      console.log(data);
      if(data.rele === "entrada_de_agua"){
        if(buttonColor1 === "red"){
          setButtonColor1("green");
        }else{
          setButtonColor1("red");
        }
      } else if(data.rele === "desague_hidroponico"){
        if(buttonColor2 === "red"){
          setButtonColor2("green");
        }else{
          setButtonColor2("red");
        }
      } else if(data.rele === "recirculacion_hidroponico"){
        if(buttonColor3 === "red"){
          setButtonColor3("green");
        }else{
          setButtonColor3("red");
        }
      }
      // if (data.rele1_pin1 === 1) {
      //   setButtonColor1("green");
      // }
      // if (data.rele1_pin1 === 0) {
      //   setButtonColor1("red");
      // }
      // if (data.rele1_pin2 === 1) {
      //   setButtonColor2("green");
      // }
      // if (data.rele1_pin2 === 0) {
      //   setButtonColor2("red");
      // }
      // if (data.rele2_pin1 === 1) {
      //   setButtonColor3("green");
      // }
      // if (data.rele2_pin1 === 0) {
      //   setButtonColor3("red");
      // }
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
  <div className="container">
    <div className="content-hidro">
      <h2>Hidropónico</h2>
      <p>status: {isConnected ? "connected" : "disconnected"}</p>
      <p>EC: {sensorECData}</p>
      <p>PH: {sensorPHData}</p>
      <p>Temperatura: {sensorTemperaturaData}</p>
      
      <button style={{ backgroundColor: buttonColor1 }} onClick={() => toogleRele("entrada_de_agua_hidroponico")}>
        Entrada 
      </button>
      <button style={{ backgroundColor: buttonColor2 }} onClick={() => toogleRele("desague_hidroponico")}>
        Salida
      </button>
      <button style={{ backgroundColor: buttonColor3 }} onClick={() => toogleRele("recirculacion_hidroponico")}>
        Recirculacion 
      </button>
      <div className="tiempo-recirculacion">
        <label> Tiempo de recirculacion (ms) </label>
        <input type="text" id="tiempoRecirculacion" placeholder="Ingrese un valor" value={tiempoRecirculacion} onChange={(e) => setTiempoRecirculacion(e.target.value)} />
      </div>
    </div>
    <div className="setpoints-section">
    <h2>Setpoints</h2>
    <div className="setpoint">
      <label htmlFor="setpoint1">EC: {setpointEcAux}</label>
      <div className="input-button-container">
        <input type="text" id="setpoint1" placeholder="Ingrese un valor" value={setpointEc} onChange={(e) => setSetpointEc(e.target.value)}/>
        <button className="setpoint-button" onClick={sendStEc}>Enviar</button>
      </div>
    </div>
    <div className="setpoint">
      <label htmlFor="setpoint2">PH: {setpointPhAux}</label>
      <div className="input-button-container">
        <input type="text" id="setpoint2" placeholder="Ingrese un valor" value={setpointPh} onChange={(e) => setSetpointPh(e.target.value)} />
        <button className="setpoint-button" onClick={sendStPh}>Enviar</button>
      </div>
    </div>
    <div className="setpoint">
      <label htmlFor="setpoint3">Temperatura: {setpointTemperaturaAux}</label>
      <div className="input-button-container">
        <input type="text" id="setpoint3" placeholder="Ingrese un valor" value={setpointTemperatura} onChange = {(e) => setSetpointTemperatura(e.target.value)}/>
        <button className="setpoint-button" onClick={sendStTemperatura}>Enviar</button>
      </div>
    </div>
  </div>
  </div>
  );
}

export default HidroponicoComponent;
