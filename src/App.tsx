import React from 'react';
import { BrowserRouter, Routes, Route, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import 'antd/dist/antd.min.css'
import MainLayout from './pages/Layout';
import Login from '@/pages/Login';
import './app.less'
import Home from './pages/Home';
import Article from './pages/Article'
import Doctor from './pages/Doctor'
import AuthCom from '@/components/AuthCom'
import { history } from '@/utils'
import Employee from './pages/Employees';

function App() {
  return (
    // 路由配置
    <HistoryRouter history={history}>
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
            <Route path='doctor' element={<Doctor />} />
            <Route path='patient' element={<Doctor />} />
            <Route path='employee' element={<Employee />} />
          </Route>
        </Routes>
      </div>
    </HistoryRouter>
  );
}

export default App;
