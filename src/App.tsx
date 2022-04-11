import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'antd/dist/antd.min.css'
import './app.less';
import Layout from './pages/Layout';
import Login from '@/pages/Login';
// import 
import { Button } from 'antd'
function App() {
  return (
    // 路由配置
    <BrowserRouter>
      <div className="App">
        <Button type='primary'>这是个button</Button>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Layout />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
