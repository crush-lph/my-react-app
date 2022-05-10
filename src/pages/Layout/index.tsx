import { Avatar, Dropdown, Layout, Menu, MenuProps, Popconfirm } from 'antd'
// import { UserOutlined } from '@ant-design/icons'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
// 刷新页面后要要将store和组件重新连接
import { observer } from 'mobx-react-lite'
import * as Icon from '@ant-design/icons'
import './index.less'
import { useStore } from '@/store'
import React, { ReactNode, useEffect } from 'react'
import { http, token } from '@/utils'
import menuList, { IMenuItem } from '@/config/MeunList'

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

  const changePwd = () => {
    http.post('/api/users/changePwd')
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
      <Menu.Item key='changePassword' onClick={changePwd}>
        修改密码
      </Menu.Item>
      <Menu.Item key='logOut' danger onClick={onConfirm}>
        <Icon.LogoutOutlined />退出登录
      </Menu.Item>
    </Menu>
  );

  //@ts-ignore
  const geticon = (iconname) => {
    //@ts-ignore
    return iconname && React.createElement(Icon[iconname])
  }

  const hasPerssions = (item: IMenuItem) => {
    const { key, isPublic } = item
    const menus = UserStore.userInfo.role?.[0]?.menus
    // 获取权限集合
    // const menus = item.menus
    // 看key有没有在menus中

    if (isPublic || menus?.indexOf(key) !== -1) {
      return true
    } else if (item.children) {
      return !!item.children.find(child => menus.indexOf(child.key) !== -1)
    }
    return false
  }

  const renderMenu = (menuList: IMenuItem[] | undefined) => {
    return menuList?.map((item: IMenuItem) => {
      /*
      {
        title
        key
        icon?
        children?
      }
      */
      if (hasPerssions(item)) {
        if (!item.children) {
          return (
            <Menu.Item key={item.key} icon={geticon(item.icon)}>
              <Link to={item.key}>
                {item.title}
              </Link>
            </Menu.Item >)
        } else {
          return (
            <Menu.SubMenu title={item.title} key={item.key} icon={geticon(item.icon)}>
              {renderMenu(item.children)}
            </Menu.SubMenu>
          )
        }
      }

    })
  }

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
                <Avatar size={48} icon={<Icon.UserOutlined />} />
              </div>
              <div className='user-info'>
                <span className='name'>{UserStore.userInfo.name}</span>
                <span className='role'>{UserStore.userInfo.identity}</span>
              </div>
            </div>
          </Dropdown>
        </div>
      </Header>
      <Layout>
        <Sider width={200} style={{ overflow: 'auto' }} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[pathname]}
            selectedKeys={[pathname]}
            style={{ height: '100%', borderRight: 0 }}
          >
            {renderMenu(menuList)}
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