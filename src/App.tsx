import React from 'react';
import {BrowserRouter, Router, Routes} from 'react-router-dom'

import { Header } from './components/layout/Header';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header />
    </div>
    </BrowserRouter>
  );
}

export default App;
