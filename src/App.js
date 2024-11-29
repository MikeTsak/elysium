import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MapComponent from './components/MapComponent';
import ListComponent from './List';

const App = () => {
  const [view, setView] = useState('map'); // Default view is map

  const toggleView = () => {
    setView((prevView) => (prevView === 'map' ? 'list' : 'map'));
  };

  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h1>Athens Domains</h1>
          <button className="view-toggle" onClick={toggleView}>
            {view === 'map' ? 'List View' : 'Map View'}
          </button>
        </header>

        <Routes>
          <Route path="/" element={view === 'map' ? <MapComponent /> : <ListComponent />} />
          <Route path="/list" element={view === 'list' ? <ListComponent /> : <MapComponent />} />
        </Routes>

        <footer className="app-footer">
          Made by <a href="https://miketsak.gr" target="_blank" rel="noopener noreferrer">miketsak</a>
        </footer>
      </div>
    </Router>
  );
};

export default App;
