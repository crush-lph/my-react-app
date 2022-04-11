import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './app.less';
import Layout from './pages/Layout';
import Login from './pages/Login';
function App() {
  return (
    // 路由配置
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* 创建路由path和组件对应关系 */}
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Layout />} />
        </Routes>
      </div>
    </BrowserRouter>
    // <div className="App">
    //   app
    // </div>
  );
}

export default App;
