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
import Rights from './pages/Rights';
import AddPatient from './pages/Patient/AddPatient';
import Patient from './pages/Patient';
import Medical from './pages/Medical';
import Role from './pages/Rights/Role'
import User from './pages/Rights/User'
import PatientList from './pages/Patient/PatientList';
import Material from './pages/Material'
import Registration from './pages/registration';
import NotFound from './pages/NotFound';


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
            <Route path='outpatient' element={<Article />} />
            <Route path='outpatient/registration' element={<Registration />} />
            <Route path='outpatient/WS' element={<Registration />} />

            <Route path='hospitalized' element={<Doctor />} />
            <Route path='hospitalized/management' element={<Doctor />} />
            <Route path='hospitalized/WS' element={<Doctor />} />

            <Route path='patient' element={<Patient />} />
            <Route path='patient/outpatient' element={<AddPatient />} />
            <Route path='patient/hospitalized' element={<PatientList />} />


            {/* <Route path='/rights/user' element={<Employee />} /> */}
            <Route path='medical' element={<Medical />} />
            <Route path='medical/dispense' element={<Medical />} />
            <Route path='medical/management' element={<Medical />} />

            {/* 权限管理 */}
            <Route path='rights' element={<Rights />} />
            {/* 用户管理 */}
            <Route path='rights/role' element={<Role />} />
            <Route path='rights/user' element={<Employee />} />
            <Route path='rights/admin' element={<Material />} />
            <Route path='registration' element={<Registration />} />

            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </HistoryRouter>
  );
}

export default App;
