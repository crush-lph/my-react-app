import { HomeOutlined } from '@ant-design/icons'

const MenuList = [
  {
    key: '/',
    title: '首页',
    icon: HomeOutlined,
  },
  // {
  //   key: '/article',
  //   title: '护士信息',
  //   icon: '',
  //   children: [
  //     {
  //       key: '/addarticle',
  //       title: '首页',
  //       icon: '',
  //     },
  //     // {
  //     //   key: '/article',
  //     //   title: '首页',
  //     //   icon: '',
  //     // }
  //   ]
  // }
  {
    key: '/nurse',
    title: '医护管理',
    icon: ''
  },
  {
    key: '/doctor',
    title: '医生信息',
    icon: ''
  },
  {
    key: 'patient',
    title: '患者管理',
    icon: ''
  }
]




export default MenuList