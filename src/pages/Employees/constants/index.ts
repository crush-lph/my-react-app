const departmentList = [
  {
    label: '儿科',
    value: 'pediatric'
  },
  {
    label: '妇科',
    value: 'gynaecology'
  },
  {
    label: '急诊科',
    value: 'emergency'
  },
  {
    label: '外科',
    value: 'surgical'
  },
  {
    label: '骨科',
    value: 'orthopaedic'
  },

]

// 学历列表
const degreeList = [
  {
    label: '博士',
    value: 'boshi'
  },
  {
    label: '硕士',
    value: 'shuoshi'
  },
  {
    label: '本科',
    value: 'benke'
  },
  {
    label: '大专',
    value: 'dazhuan'
  },
  {
    label: '高中及以下',
    value: 'gaozhong'
  },
]

// 邮箱表单验证
const emailRule = [
  {
    type: 'email',
    message: '请输入一个合法的邮箱'
  },
  {
    required: true,
    message: '请输入邮箱',
  },
]
// 必选项提示信息
const isRequired = (msg: string) => {
  return [
    {
      required: true,
      message: msg
    }
  ]
}

export {
  departmentList,
  degreeList,
  emailRule,
  isRequired
}