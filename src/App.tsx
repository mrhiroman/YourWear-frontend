import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import { Header } from './components/layout/Header';
import { Footer } from 'components/layout/Footer';
import { MainPage } from 'pages/MainPage';
import { CustomizerPage } from 'pages/CustomizerPage';
import { store } from 'redux/store';
import { Provider } from 'react-redux'
import { ShopPage } from 'pages/ShopPage';
import { RegistrationPage } from 'pages/RegistrationPage';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <Header />
          <Routes>
            <Route path='' element={<MainPage />}/>
            <Route path='/customizer' element={<CustomizerPage />}/>
            <Route path='/shop' element={<ShopPage />}/>
            <Route path='/registration' element={<RegistrationPage />}/>
          </Routes>
          <Footer />
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
