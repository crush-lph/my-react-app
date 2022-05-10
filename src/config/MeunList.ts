
export interface IMenuItem {
  key: string,
  title: string,
  icon?: string,
  children?: IMenuItem[],
  isPublic?: boolean




}

const MenuList: IMenuItem[] = [
  {
    key: '/',
    title: '首页',
    icon: 'HomeOutlined',
    isPublic: true,
  },
  {
    key: '/nurse',
    title: '护士信息',
    icon: 'DiffOutlined',
  },
  {
    key: '/doctor',
    title: '医生管理',
    icon: 'UsergroupAddOutlined'
  },
  {
    key: '/registration',
    title: '挂号系统',
    icon: 'IdcardOutlined'
  },
  {
    key: '/patient',
    title: '患者信息',
    icon: 'IdcardOutlined',
    children: [{
      title: '患者档案',
      key: '/patient/list',
    }, {
      title: '添加患者档案',
      key: '/patient/addPatient'
    }]
  },
  {
    key: '/medical',
    title: '药库管理',
    icon: 'HddOutlined'
  },
  // {
  //   key: '/employee',
  //   title: '员工注册',
  //   icon: 'UserAddOutlined'
  // },
  {
    key: '/rights',
    title: '系统管理',
    icon: 'UnlockOutlined',
    children: [
      {
        key: '/rights/user',
        title: '用户管理'
      }, {
        key: '/rights/role',
        title: '角色管理'
      },
      {
        key: '/rights/admin',
        title: '行政管理',
        // icon: 'UnlockOutlined',
      }
    ]
  },

]




export default MenuList