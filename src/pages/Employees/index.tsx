import React, { useEffect, useState } from 'react'
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table/interface';
import Input from 'antd/lib/input/Input';
import AddUser from './addUser'
import { observer } from 'mobx-react-lite'
import './index.less'
import { useStore } from '@/store';

const Employee = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [tableData, setTableData] = useState()
  const { UserStore } = useStore()

  useEffect(() => {
    UserStore.getAllUser().then(res => {
      console.log(res.data);
      setTableData(res.data)
    })
  }, [])

  const columns: ColumnsType<any> = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '入职时间',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 100,
      align: 'center',

      render: () => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button icon={<EyeOutlined />} type='link'></Button>
          <Button icon={<EditOutlined />} type='link'></Button>
          <Button danger icon={<DeleteOutlined />} type='link'></Button>
        </div >
      ),
    },
  ]

  // const data: object[] = [];
  // for (let i = 0; i < 100; i++) {
  //   data.push({
  //     key: i,
  //     name: `Edrward ${i}`,
  //     age: 32,
  //     address: `London Park no. ${i}`,
  //   });
  // }

  const handleAdd = () => {
    setIsModalVisible(true)
  }

  return (
    <>
      <div className='hms-userInfo'>
        <Input style={{ width: 200 }} />
        <Button onClick={handleAdd}>添加</Button>
      </div>
      {isModalVisible && <AddUser visible={isModalVisible} setIsModalVisible={setIsModalVisible} />}
      <Table columns={columns} dataSource={tableData}
        rowKey={record => record._id}
      // scroll={{ x: 1500 }}
      />
    </>
  )
}

export default Employee