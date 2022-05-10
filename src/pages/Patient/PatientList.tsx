import React, { useEffect, useState } from 'react'
import { Button, message, Table } from 'antd'
import { http } from '@/utils'
import { ColumnsType } from 'antd/lib/table/interface'
import moment from 'moment'
import { EyeOutlined, EditOutlined, DeleteOutlined, ExportOutlined } from '@ant-design/icons'
import Detail from './Detail'
import { Ipatient } from './AddPatient'



export default function PatientList() {
  const [patientData, setPatientData] = useState<Ipatient[]>([])
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [detail, setDetail] = useState<Ipatient>()

  useEffect(() => {
    getPatientData()
  }, [])


  // 获取患者数据
  const getPatientData = () => {
    http.get('/api/patient').then(res => {
      if (res.data.code === 0) {
        setPatientData(res.data.data)
      } else {
        setPatientData([])
      }
    })
  }

  const deletePatient = (id: string) => {
    http.post('/api/patient/delete', { id }).then(res => {
      if (res.data.code == 0) {
        message.success('删除成功')
        getPatientData()
      } else {
        message.error('删除失败')
      }
    })
  }

  const columns: ColumnsType<Ipatient> = [
    {
      dataIndex: 'date',
      title: '建档日期',
      render: (text) => {
        return text ? moment(text).format('YYYY年MM月DD日 H:mm:ss') : ''
      }
    },
    {
      dataIndex: 'name',
      title: '姓名'
    },
    {
      dataIndex: 'age',
      title: '年龄'
    },
    {
      dataIndex: 'gender',
      title: '性别'
    },

    {
      dataIndex: 'doctor',
      title: '主治医师'
    },
    {
      dataIndex: 'option',
      title: '操作',
      render: (text, record, index) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button icon={<EyeOutlined />} type='link'
              onClick={() => {
                setDetail(record)
                setShowDetail(true)
              }}>
            </Button>
            {/* 编辑 */}
            <Button
              onClick={() => {

              }}
              icon={<EditOutlined />}
              type='link'>
            </Button>
            {/* 删除 */}
            <Button danger
              onClick={() => {
                deletePatient(record._id)
              }}
              icon={<DeleteOutlined />}
              type='link'>
            </Button>
          </div>
        )
      }
    },
  ]

  return (
    <>
      {detail && <Detail visible={showDetail} setVisible={setShowDetail} detail={detail as Ipatient} />}
      <Table rowKey='_id' dataSource={patientData} columns={columns}>

      </Table>
    </>
  )
}
