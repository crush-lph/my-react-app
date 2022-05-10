import React, { useEffect, useState } from 'react'
import { Table, Card, Button, Input, message, Form, Tree, Badge } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { EditOutlined, DeleteOutlined, ExportOutlined } from '@ant-design/icons'
import { http } from '@/utils'
import Modal from 'antd/lib/modal/Modal'
import menuList from '@/config/MeunList'
import { Key } from 'readline'
import { useStore } from '@/store'
import moment from 'moment'

export type IRole = {
  name: string;
  menus?: React.Key[];
  _id: string;
  auth_time?: string;
  auth_name: string;
}

export default function Role() {
  const [roleData, setRoleData] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [isAuthVisible, setIsAuthVisible] = useState(false)
  const [menuTree, setMenuTree] = useState(menuList)
  const [currentRole, setCurrentRole] = useState<IRole>()
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([])

  const { UserStore } = useStore()


  const [form] = Form.useForm()

  useEffect(() => {
    getRoleData()
  }, [])

  const getRoleData = () => {
    http.get('/api/role').then(res => {
      if (res.data.code === 0) {

        setRoleData(res.data.data)
      }
    })
  }

  const columns: ColumnsType<any> = [{
    title: "角色名称",
    dataIndex: 'name',
    key: 'name'
  }, {
    title: '创建时间',
    dataIndex: 'create_time',
    key: 'create_time',
    render: (text, row, index) => {
      return text ? moment(text).format('YYYY年MM月DD日  H:mm:ss') : ''
    }
  },
  {
    dataIndex: 'isAuth',
    key: 'isAuth',
    title: '状态',
    render: (text) => {
      return text == 1 ? (<Badge status="processing" text="已授权" />) : (<Badge status='error' text='未授权' />)
    }
  },
  {
    title: '授权时间',
    dataIndex: 'auth_time',
    key: 'auth_time',
    render: (text, row, index) => {
      return text ? moment(text).format('YYYY年MM月DD日  H:mm:ss') : ''
    }
  }, {
    dataIndex: 'auth_name',
    key: 'auth_name',
    title: '授权人'
  }, {
    title: '操作',
    key: '',
    dataIndex: 'option',
    render: (text, row, index) => (

      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* 编辑 */}
        <Button
          onClick={() => {
            setIsAuthVisible(true)
            setCurrentRole(row)
            setCheckedKeys(row.menus)
          }}
          icon={<EditOutlined />}
          type='link'>
        </Button>
        {/* 删除 */}
        <Button danger
          onClick={() => {
            deleteRole(row._id)
          }}
          icon={<DeleteOutlined />}
          type='link'>
        </Button>
      </div >
    ),
  }]

  const deleteRole = (id: string) => {
    console.log(id)
    http.post('/api/role/delete', { _id: id }).then(res => {
      if (res.data.code === 0) {
        message.success('删除成功')
        getRoleData()
      } else {
        message.error('删除失败')
      }
    })
  }

  const addRole = () => {
    form.validateFields().then(async res => {
      //发起请求 
      const result = await http.post('/api/role/add', { name: res.roleName })
      if (result.data.code === 0) {
        setIsVisible(false)
        form.resetFields()
        message.success('添加成功')
        getRoleData()
      } else {
        message.error(result.data.msg)
      }
    }).catch(e => {
      console.log(e)
    })
  }

  const updateRole = () => {
    console.log(checkedKeys)
    console.log(currentRole)
    if (currentRole) {
      const params: IRole = {
        _id: currentRole._id,
        menus: checkedKeys,
        name: currentRole.name,
        auth_name: UserStore.userInfo.name as string
      }
      http.post('/api/role/update', params).then(res => {
        if (res.data.code === 0) {
          message.success('授权成功')
          setIsAuthVisible(false)
          getRoleData()
        } else {
          message.error('授权失败')
        }
      })
    }
  }

  const handleCancel = () => {
    setIsVisible(false);
    setIsAuthVisible(false)
    form && form.resetFields()
  };


  const onCheck = (checked: React.Key[]) => {
    setCheckedKeys(checked)
  }


  return (
    <>
      <div className='hms-userInfo'>
        <div>
          <Input style={{ width: 200 }} />
        </div>
        <Button onClick={() => {
          setIsVisible(true)
        }}>创建角色</Button>
      </div>
      <Modal
        forceRender
        visible={isVisible}
        title='添加角色'
        onOk={addRole}
        onCancel={handleCancel}
        okText='确认'
        cancelText='取消'
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          form={form}
        >
          <Form.Item label='角色名称' name='roleName' rules={[{
            required: true,
            message: '请输入角色名称'
          }]}>
            <Input placeholder='请输入角色名称' ></Input>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        forceRender
        visible={isAuthVisible}
        title='设置角色权限'
        onOk={updateRole}
        onCancel={handleCancel}
        okText='确认'
        cancelText='取消'
      >
        <Form>
          <Form.Item label='角色名称' labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <Input value={currentRole?.name}></Input>
          </Form.Item>
          <Tree
            defaultExpandAll={true}
            checkable
            checkedKeys={checkedKeys}
            onCheck={(checked) => {
              onCheck(checked as string[])
            }}
            treeData={menuTree}
          />
        </Form>
      </Modal>


      <Table
        dataSource={roleData}
        columns={columns}
        rowKey={record => record._id}
      />
    </>
  )
}

