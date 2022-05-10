import { Card, Divider, Form, Input, Select } from 'antd'
import React from 'react'

const { Option } = Select

export default function Registration() {
  const [form] = Form.useForm();

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
        <Form.Item name='card_type' label='身份凭证'>
          <Select>
            <Option value='身份证'>
              身份证
            </Option>
            <Option value='健康证'>
              健康证
            </Option>
          </Select>
        </Form.Item>
        <Form.Item name='department' label='科室'>
          <Select></Select>
        </Form.Item>
        <Form.Item name='doctor' label='就诊医生'>
          <Select></Select>
        </Form.Item>
      </Form>
    </div>


  )
}
