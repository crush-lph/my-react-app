const departmentList = [
  {
    label: '儿科',
    value: '儿科'
  },
  {
    label: '妇科',
    value: '妇科'
  },
  {
    label: '急诊科',
    value: '急诊科'
  },
  {
    label: '外科',
    value: '外科'
  },
  {
    label: '骨科',
    value: '骨科'
  },

]

// 学历列表
const degreeList = [
  {
    label: '博士',
    value: '博士'
  },
  {
    label: '硕士',
    value: '硕士'
  },
  {
    label: '本科',
    value: '本科'
  },
  {
    label: '大专',
    value: '大专'
  },
  {
    label: '高中及以下',
    value: '高中及以下'
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