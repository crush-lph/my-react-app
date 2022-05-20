import { http } from '@/utils';
import { Button, Card, Divider, Form, Input, Select } from 'antd'
import React,{useState,useEffect} from 'react'

const { Option } = Select

export interface IOption{
  _id:string;
  name:string
}

export default function Registration() {
  const [form] = Form.useForm();
  const [departList,setDepartList] = useState<IOption[]>([])
  const [doctorList,setDoctorList] = useState<IOption[]>([])

  useEffect(()=>{
    getDoctor()
    getDepart()
  },[])

  const getDoctor = ()=>{

  }
  
  const getDepart =()=>{
     http.get(`/api/department`).then(res => {
      if (res.data.code == 0) {
        setDepartList(res.data.data)
      } else {
        setDepartList([])
      }
    })
  }
  return (
    <div>
      <Divider plain>
        <h1 style={{ fontSize: 24 }}>新建患者档案</h1>
      </Divider>
      <Form
        layout='horizontal'
        form={form}
        labelCol={{ span: 5, offset: 4 }}
        wrapperCol={{ span: 8 }}
      >
        <Form.Item name='name' label='患者姓名'>
          <Input></Input>
        </Form.Item>
        <Form.Item name='idNumber' label='身份证号'>N
          <Input></Input>
        </Form.Item>
        <Form.Item name='department' label='科室'>
          <Select>
            {departList?.map(item=>(
              <Option key={item._id}>{item.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name='doctor' label='就诊医生'>
          <Select></Select>
        </Form.Item>
        <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size='large'
              block>
              挂号
            </Button>
          </Form.Item>
      </Form>
    </div>


  )
}
