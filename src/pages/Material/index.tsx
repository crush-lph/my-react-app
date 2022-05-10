import { http } from '@/utils'
import { Badge, Button, Col, Form, Input, message, Modal, Row, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { EditOutlined, DeleteOutlined, ExportOutlined, KeyOutlined } from '@ant-design/icons'
import { ColumnsType } from 'antd/lib/table/interface'
import moment from 'moment'
import { useStore } from '@/store'

const { Option } = Select

export default function Material() {

  const [tableData, setTableData] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [field, setField] = useState<'identity' | 'department'>('department')

  const [form] = Form.useForm()
  const { UserStore } = useStore()

  useEffect(() => {
    getData()
  }, [field])

  const list = [{
    label: '职位',
    value: 'identity'
  }, {
    label: '部门',
    value: 'department'
  }]


  const getData = () => {
    http.get(`/api/${field}`).then(res => {
      if (res.data.code == 0) {
        setTableData(res.data.data)
      } else {
        setTableData([])
      }
    })
  }

  const authDate = (row: any) => {
    http.post(`/api/${field}/update`, {
      _id: row._id,
      auth_name: UserStore.userInfo.name as string
    }).then(res => {
      if (res.data.code === 0) {
        message.success('认证成功')
        getData()
      } else {
        message.error('认证失败，请重试')
      }
    })
  }

  const addData = () => {
    form.validateFields().then(async res => {
      //发起请求 
      const result = await http.post(`/api/${field}/add`, { name: res.name })
      if (result.data.code === 0) {
        setIsVisible(false)
        form.resetFields()
        message.success('添加成功')
        getData()
      } else {
        message.error(result.data.msg)
      }
    }).catch(e => {
      console.log(e)
    })
  }


  const columns: ColumnsType<any> = [{
    title: "名称",
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
    dataIndex: 'update_time',
    key: 'update_time',
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
          disabled={row.isAuth === 1}
          onClick={() => {
            authDate(row)
          }}
          icon={< KeyOutlined />}
          type='link'>
        </Button>
        {/* 删除 */}
        <Button danger
          onClick={() => {
            // deleteRole(row._id)
          }}
          icon={<DeleteOutlined />}
          type='link'>
        </Button>
      </div >
    ),
  }]


  const handleCancel = () => {
    setIsVisible(false);
    form && form.resetFields()
  };

  return (

    <div>
      <div className='hms-userInfo'>
        <div>
          <Select style={{ width: 200 }} value={field} onChange={(val) => {
            setTableData([])
            setField(val)
          }}>
            {list.map(item => (
              <Option key={item.value}>{item.label} </Option>
            ))}
          </Select>
        </div>
        <Button onClick={() => {
          setIsVisible(true)
        }}>{field == 'department' ? '新建部门' : '添加职位'}</Button>
      </div>
      <Modal
        forceRender
        visible={isVisible}
        title={field == 'department' ? '新建部门' : '添加职位'}
        onOk={addData}
        onCancel={handleCancel}
        okText='确认'
        cancelText='取消'
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          form={form}
        >
          <Form.Item label='名称' name='name' rules={[{
            required: true,
            message: '请输入名称'
          }]}>
            <Input placeholder='请输入名称' ></Input>
          </Form.Item>
        </Form>
      </Modal>

      <Table
        dataSource={tableData}
        columns={columns}
        rowKey={record => record._id}
      />
    </div>

  )
}
