import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomeTemplate from './Template/HomeTemplate';
import BaiTapBurger from './BaiTapBurger/BaiTapBurger'

import { Provider} from 'react-redux'
import { store } from './redux/configStore';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render (

  <>
  <Provider store={store}>
  <BrowserRouter>
    <Routes>
      
      <Route path='/' element={<HomeTemplate />}>

        <Route index element={<BaiTapBurger />} />
        <Route path='burger' element={<BaiTapBurger />} />
        <Route path='*' element={<Navigate to="/" />} />
       
      </Route>
    </Routes>
  </BrowserRouter>
  // </Provider>
  // </>

)

