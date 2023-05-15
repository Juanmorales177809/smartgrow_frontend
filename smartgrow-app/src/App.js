import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from "./home/HomePage.jsx";
import React from 'react';
import SensorApp from "./sensors/SensorApp.jsx"

function App() {
  return (
    
      <BrowserRouter>
       
        <Routes>
          <Route path="/" element={<HomePage/>}/>
            
        </Routes>

        <Routes>
          <Route path='/max' element={<SensorApp/>}/>
        </Routes>
      
        </BrowserRouter>
  );
}

export default App;
