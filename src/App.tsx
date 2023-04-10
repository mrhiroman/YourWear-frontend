import React from 'react';
import {BrowserRouter, Router, Routes} from 'react-router-dom'

import { Header } from './components/layout/Header';
import { Footer } from 'components/layout/Footer';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header />
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
