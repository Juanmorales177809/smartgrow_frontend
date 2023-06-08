import React from 'react';
import './App.css'

import SensoresComponent from './components/SensoresComponent';
import HidroponicoComponent from './components/HidroponicoComponent';
import ImagenComponent from './components/ImagenComponent';
import ResumenComponent from './components/ResumenComponent';
//import {Hidroponico} from './Hidroponico';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>SmartGrow</h1>
      </header>
      <div className="App-content">
        <div className="grid-item">
          <SensoresComponent />
        </div>
        <div className="grid-item">
          <HidroponicoComponent />
        </div>
        <div className="grid-item">
          <ImagenComponent />
        </div>
        <div className="grid-item">
          <ResumenComponent />
        </div>
      </div>
    </div>
  );
}

export default App;
