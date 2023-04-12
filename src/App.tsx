import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import { Header } from './components/layout/Header';
import { Footer } from 'components/layout/Footer';
import { MainPage } from 'pages/MainPage';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header />
      <Routes>
        <Route path='' element={<MainPage />}/>
      </Routes>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
