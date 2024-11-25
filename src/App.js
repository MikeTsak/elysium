import React from 'react';
import './App.css';
import MapComponent from './components/MapComponent'; // Import the map component

const App = () => {
  return (
    <div className="App">
      <h1>Athnes Domains</h1>
      <MapComponent />
      <footer className="app-footer">
        <br></br>
        <br></br>
        Made by <a href="https://miketsak.gr" target="_blank" rel="noopener noreferrer">miketsak</a>
      </footer>
    </div>
  );
};

export default App;
