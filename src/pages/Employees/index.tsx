import React, { useEffect, useState } from 'react'
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table/interface';
import Input from 'antd/lib/input/Input';
import AddUser from './addUser'
import './index.less'
import { useStore } from '@/store';
import Detail from './Detail';
import moment from 'moment'
import { downLoadXLS } from '@/utils'

const Employee = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [tableData, setTableData] = useState()
  const [showDetial, setShowDetail] = useState(false)
  const { UserStore } = useStore()
  const [currentDetail, setCurrentDetail] = useState<object>()

  useEffect(() => {
    getTableData()
  }, [])

  // 获取表格数据
  const getTableData = () => {
    UserStore.getAllUser().then(res => {
      setTableData(res.data)
    })
  }

  // 打开详情页
  const openDetail = (record: object) => {
    setShowDetail(true)
    setCurrentDetail(record)
  }

  // 导出表格
  const exportData = () => {
    downLoadXLS('员工信息', [{
      sheetData: [{ a: 1, b: 2 }, { c: 3, d: 4 }],
      sheetHeader: ['a', 'b'],
      sheetName: '员工信息',
      columnWidths: [20, 20]
    }])
  }



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
      render: (text) => {
        return moment(Number(text)).format('YYYY年MM月DD日')
      }
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

      render: (text, record, index) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button icon={<EyeOutlined />} type='link'
            onClick={() => {
              openDetail(record)
            }}></Button>
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
      <Detail
        visible={showDetial}
        setVisible={setShowDetail}
        detail={currentDetail as object}
      ></Detail>
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