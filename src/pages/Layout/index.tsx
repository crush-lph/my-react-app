import { Avatar, Dropdown, Layout, Menu, MenuProps, Popconfirm } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
// 刷新页面后要要将store和组件重新连接
import { observer } from 'mobx-react-lite'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
  DownOutlined,
  IdcardOutlined,
  UsergroupAddOutlined,
  UserAddOutlined,
  KeyOutlined,
  UnlockOutlined
} from '@ant-design/icons'
import './index.less'
import { useStore } from '@/store'
import React, { useEffect } from 'react'
import { token } from '@/utils'

const { Header, Sider } = Layout

const MainLayout = () => {
  // 获取当前的路径
  const { pathname } = useLocation()
  const { UserStore, LoginStore } = useStore()

  useEffect(() => {
    // 获取当前用户信息
    UserStore.getUserInfo()
  }, [])

  // 确定退出
  const navigate = useNavigate()
  const onConfirm = () => {
    LoginStore.logOut()
    navigate('/login')
  }

  // 下拉菜单菜单配置
  const menu = (
    <Menu>
      <Menu.Item key='/'>
        <Link to='/'>首页</Link>
      </Menu.Item>
      <Menu.Item key='profile'>
        个人中心
      </Menu.Item>
      <Menu.Item key='changePassword'>
        修改密码
      </Menu.Item>
      <Menu.Item key='logOut' danger onClick={onConfirm}>
        <LogoutOutlined />退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Header className="header">
        <div className="header-container">
          <Link to='/'>
            <div className="logo" />
          </Link>
          <Dropdown overlay={menu}>
            <div className="user">
              <div className='avatar'>
                {/* <img src={UserStore.userInfo.avatar} alt="" /> */}
                <Avatar size={48} icon={<UserOutlined />} />
              </div>
              <div className='user-info'>
                <span className='name'>{UserStore.userInfo.email}</span>
                <span className='role'>{UserStore.userInfo.identity}</span>
              </div>
            </div>
          </Dropdown>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[pathname]}
            selectedKeys={[pathname]}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item icon={<HomeOutlined />} key="/">
              <Link to='/'>首页</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/nurse">
              <Link to="/nurse">护士管理</Link>
            </Menu.Item>
            <Menu.Item icon={<UsergroupAddOutlined />} key="/doctor">
              <Link to='/doctor'>医生管理</Link>
            </Menu.Item>
            <Menu.Item icon={<IdcardOutlined />} key="/patient">
              <Link to='/patient'>患者管理</Link>
            </Menu.Item>
            <Menu.Item icon={<UserAddOutlined />} key="/employee">
              <Link to='/employee'>员工注册</Link>
            </Menu.Item>
            {/* <Menu.Item icon={<UnlockOutlined />} key="/rights">
              <Link to='/rights'>权限管理</Link>
            </Menu.Item> */}
            <Menu.SubMenu key="/rights" title="权限管理" icon={<UnlockOutlined />}>
              <Menu.Item key="/rights/role" >
                <Link to='/rights/role'>角色管理</Link>
              </Menu.Item>
              <Menu.Item key="/rights/user" >
                <Link to='/rights/user'>用户管理</Link>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由出口 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default observer(MainLayout)