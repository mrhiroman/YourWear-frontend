import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import { Header } from './components/layout/Header';
import { Footer } from 'components/layout/Footer';
import { MainPage } from 'pages/MainPage';
import { CustomizerPage } from 'pages/CustomizerPage';
import { useAppDispatch } from 'redux/store';
import { ShopPage } from 'pages/ShopPage';
import { RegistrationPage } from 'pages/RegistrationPage';
import { CustomerPage } from 'pages/CustomerPage';
import { OpenAPI, UserService } from 'generated/api';

import { GoogleOAuthProvider } from '@react-oauth/google'
import { setUser } from 'redux/user/slice';


function App() {
  const dispatch = useAppDispatch()
  const validate = (token: string) => {
    OpenAPI.TOKEN = token
  
    UserService.getApiInfo() //Todo make a special metod to check login
    .then(resp => {
      dispatch(setUser(resp))
      console.log(resp)
    })
    .catch(err => {
      OpenAPI.TOKEN = ''
    })
  
  }

  OpenAPI.BASE = 'http://localhost:5087'
  
  const token = localStorage.getItem("token")
  token && validate(token)
  
  return (
    <BrowserRouter>
        <GoogleOAuthProvider clientId='611860978924-1ktei1s71qsseenjboeubgdnmq8oa2v0.apps.googleusercontent.com'>
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
        </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;
