import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'

import { Header } from './components/layout/Header';
import { Footer } from 'components/layout/Footer';
import { MainPage } from 'pages/MainPage';
import { CustomizerPage } from 'pages/CustomizerPage';
import { store } from 'redux/store';
import { Provider } from 'react-redux'
import { ShopPage } from 'pages/ShopPage';
import { RegistrationPage } from 'pages/RegistrationPage';
import { CustomerPage } from 'pages/CustomerPage';
import { OpenAPI, OrderService, UserService } from 'generated/api';

const validate = (token: string) => {
  console.log(token)
  OpenAPI.TOKEN = token

  OrderService.getApiOrders() //Todo make a special metod to check login
  .then(resp => {
    // Todo user in state, signin = true
  })
  .catch(err => {
    OpenAPI.TOKEN = ''
  })

}

function App() {
  OpenAPI.BASE = 'https://localhost:7041'
  
  const token = localStorage.getItem("token")
  token && validate(token)
  

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
            <Route path='/profile' element={<CustomerPage />}/>
          </Routes>
          <Footer />
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
