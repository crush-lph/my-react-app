import { Dropdown, Layout, Menu, Popconfirm } from 'antd'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
  DownOutlined
} from '@ant-design/icons'
import './index.less'
import { useStore } from '@/store'
import { useEffect } from 'react'


const { Header, Sider } = Layout

const MainLayout = () => {
  // 获取当前的路径
  const { pathname } = useLocation()
  // const { userStore, loginStore, channelStore } = useStore()
  // userStore.getUserInfo()?
  // useEffect(() => {
  //   userStore.getUserInfo()
  //   channelStore.loadChannelList()
  // }, [userStore, channelStore])

  // 确定退出
  const navigate = useNavigate()
  const onConfirm = () => {
    // 退出登录 删除token 跳回到登录
    // loginStore.loginOut()
    navigate('/login')
  }

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
      <Menu.Item danger onClick={onConfirm}>
        <LogoutOutlined />退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <Layout>
      <Header className="header">
        <div className="header-container">
          <div className="logo" />
          <Dropdown overlay={menu}>
            <div className="user">
              <div className='avatar'></div>
              <div className='user-info'>
                <span className='name'>李鹏虎</span>
                <span className='role'>管理员</span>
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
              <Link to="/nurse">内容管理</Link>
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="/doctor">
              <Link to='/doctor'> 发布文章</Link>
            </Menu.Item>
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