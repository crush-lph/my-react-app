import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'antd/dist/antd.min.css'
import MainLayout from './pages/Layout';
import Login from '@/pages/Login';
import './app.less'
import Home from './pages/Home';
import Article from './pages/Article'
import Publish from './pages/Publish'
import AuthCom from '@/components/AuthCom'

function App() {
  return (
    // 路由配置
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={
            <AuthCom>
              <MainLayout />
            </AuthCom>
          } >
            <Route index element={<Home />} />
            <Route path='nurse' element={<Article />} />
            <Route path='doctor' element={<Publish />} />
            <Route path='patient' element={<Publish />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
