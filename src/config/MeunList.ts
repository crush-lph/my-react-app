
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
    key: '/outpatient',
    title: '门诊管理',
    icon: 'DiffOutlined',
    children: [{
      title: '挂号系统',
      key: '/outpatient/registration',
    }, {
      title: '门诊工作站',
      key: '/outpatient/WS'
    }]
  },
  {
    key: '/hospitalized',
    title: '住院管理',
    icon: 'UsergroupAddOutlined',
    children: [{
      title: '病患管理',
      key: '/hospitalized/management',
    }, {
      title: '医护工作站',
      key: '/hospitalized/WS'
    }]
  },
  // {
  //   key: '/registration',
  //   title: '挂号系统',
  //   icon: 'IdcardOutlined'
  // },
  // {
  //   key: '/registration',
  //   title: '',
  //   icon: 'IdcardOutlined'
  // },
  {
    key: '/patient',
    title: '患者管理',
    icon: 'IdcardOutlined',
    children: [{
      title: '门诊档案管理',
      key: '/patient/outpatient',
    }, {
      title: '住院档案管理',
      key: '/patient/hospitalized'
    }]
  },
  {
    key: '/medical',
    title: '药库管理',
    icon: 'HddOutlined',
    children: [
      {
        key: '/medical/dispense',
        title: '处方发药'
      }, {
        key: '/medical/management',
        title: '库存管理'
      },
    ]
  },
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