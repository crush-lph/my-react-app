import React, { useEffect, useState } from 'react'
import { EyeOutlined, EditOutlined, DeleteOutlined, ExportOutlined } from '@ant-design/icons'
import { Button, message, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table/interface';
import Input from 'antd/lib/input/Input';
import AddUser from './addUser'
import './index.less'
import { useStore } from '@/store';
import Detail from './Detail';
import moment from 'moment'
import { downLoadXLS, http } from '@/utils'
import { AxiosRequestConfig } from 'axios';

interface Idetial {
  name?: string;
  adress: string;
  degree: string;
  department?: string;
  email?: string;
  avatar?: string;
  entry_date?: string;
  identity?: string;
  gender?: string;
  phone?: string | number;
  major?: string;
}

const Employee = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [tableData, setTableData] = useState([])
  const [showDetial, setShowDetail] = useState(false)
  const { UserStore } = useStore()
  const [currentDetail, setCurrentDetail] = useState<Idetial>()
  const [modalType, setModalType] = useState<string>()

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
  const openDetail = (record: any) => {
    setShowDetail(true)
    setCurrentDetail(record)
  }

  // 删除用户
  const deleteUser = (id: string) => {
    UserStore.deleteUser(id).then(res => {
      getTableData()
    }
    )
  }

  // 添加用户
  const addUser = () => {
    UserStore.addUser({}).then(res => {
      getTableData()
    })
  }

  // 导出表格
  const exportData = () => {
    // tableData.map()
    const columns = [
      { label: '姓名', dataIndex: 'name' },
      { label: '性别', dataIndex: 'gender' },
      { label: '职位', dataIndex: 'identity' },
      { label: '科室', dataIndex: 'department' },
      { label: '学历', dataIndex: 'degree' },
      { label: '专业', dataIndex: 'major' },
      { label: '电话', dataIndex: 'phone' },
      { label: '邮箱', dataIndex: 'email' },
      { label: '住址', dataIndex: 'adress' },
      { label: '入职时间', dataIndex: 'entry_date' },
    ]
    const sheetHeader: string[] = []
    const indexList: string[] = []
    columns.map(item => {
      sheetHeader.push(item.label)
      indexList.push(item.dataIndex)
    })
    downLoadXLS('员工信息', [{
      sheetData: tableData,
      sheetHeader: sheetHeader,
      sheetName: `员工信息`,
      sheetFilter: indexList
      // columnWidths: [20, 20]
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
      dataIndex: 'entry_date',
      key: 'entry_date',
      render: (text) => {
        // return moment(Number(text)).format('YYYY年MM月DD日')
        return moment(text).format('YYYY年MM月DD日')
      }
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: '职位',
      dataIndex: 'identity',
      key: 'identity'
    },
    {
      title: '科室',
      dataIndex: 'department',
      key: 'department'
    },
    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 100,
      align: 'center',

      render: (text, record, index) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* 查看详情 */}
          <Button icon={<EyeOutlined />} type='link'
            onClick={() => {
              openDetail(record)
            }}>
          </Button>
          {/* 编辑 */}
          <Button
            onClick={() => {
              setModalType('edit')
              setIsModalVisible(true)
            }}
            icon={<EditOutlined />}
            type='link'>
          </Button>
          {/* 删除 */}
          <Button danger
            onClick={() => {
              deleteUser(record._id)
            }}
            icon={<DeleteOutlined />}
            type='link'>
          </Button>
        </div >
      ),
    },
  ]


  const handleAdd = () => {
    setIsModalVisible(true)
    setModalType('add')
  }

  return (
    <>
      { currentDetail && <Detail
        visible={showDetial}
        setVisible={setShowDetail}
        detail={currentDetail as Idetial}
      ></Detail>}
      <div className='hms-userInfo'>
        <div>
          <Input style={{ width: 200 }} />
          <Button icon={<ExportOutlined />} style={{ marginLeft: 16 }} onClick={exportData}> 导出</Button>
        </div>
        <Button onClick={handleAdd}>添加</Button>
      </div>
      {isModalVisible && <AddUser
        getList={getTableData}
        visible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        type={modalType} />}
      <Table columns={columns} dataSource={tableData}
        rowKey={record => record._id}
      // scroll={{ x: 1500 }}
      />
    </>
  )
}

export default Employee