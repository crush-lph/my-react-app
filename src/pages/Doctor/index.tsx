import React, { useState } from 'react'
import { Button, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table/interface';
import MyDrawer from './Drawer';
import Input from 'antd/lib/input/Input';
import './index.less'

export default function Doctor() {
  const [visible, setVisible] = useState<boolean>(false)


  const columns: ColumnsType<object> = [
    {
      title: '姓名',
      width: 100,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    },
    {
      title: '地址',
      width: 100,
      dataIndex: 'age',
      key: 'age',
      fixed: 'left',
    },
    {
      title: '性别',
      dataIndex: 'address',
      key: '1',
      width: 150,
    },
    {
      title: '年龄',
      dataIndex: 'address',
      key: '2',
      width: 150,
    },
    {
      title: '职称',
      dataIndex: 'address',
      key: '3',
      width: 150,
    },
    {
      title: '科室',
      dataIndex: 'address',
      key: '4',
      width: 150,
    },
    {
      title: '学历',
      dataIndex: 'address',
      key: '5',
      width: 150,
    },
    {
      title: '专业',
      dataIndex: 'address',
      key: '6',
      width: 150,
    },
    {
      title: '入职时间',
      dataIndex: 'address',
      key: '7',
      width: 150,
    },
    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: () => <Button onClick={() => { setVisible(true) }}>查看</Button>,
    },
  ];

  const data: object[] = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    });
  }
  return (
    <>
      <div className='hms-doctorInfo'>
        <Input style={{ width: 200 }} />
        <Button>添加</Button>
      </div>
      <MyDrawer visible={visible} setVisible={setVisible} />
      <Table columns={columns} dataSource={data} scroll={{ x: 1500 }} />
    </>
  )
}
