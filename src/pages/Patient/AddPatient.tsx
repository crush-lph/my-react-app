
import React, { useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Divider,
  DatePicker,
  message,
} from 'antd';
import { http } from '@/utils'
import { useNavigate } from 'react-router-dom'


export interface Ipatient {
  date?: string

  name?: string
  origin?: string
  gender?: string
  ID_number?: string
  phone?: string
  age?: string
  adress?: string
  contact_name?: string
  contact_phone?: string,
  contact_relation?: string,
  condition?: string,
  medical_history?: string,
  doctor?: string
  department?: string,
  _id: string
}


const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const AddPatient = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate()

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    http.post('/api/patient/add', values).then((res: any) => {
      if (res.data.code === 0) {
        message.success('添加成功')
        navigate('/patient/list')
      }
    })
  };

  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

  const onWebsiteChange = (value: string) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map(domain => `${value}${domain}`));
    }
  };

  const websiteOptions = autoCompleteResult.map(website => ({
    label: website,
    value: website,
  }));

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      scrollToFirstError
    >
      <Divider plain orientation="left">
        <h1 style={{ fontSize: 24 }}>新建患者档案</h1>
      </Divider>
      <Form.Item
        name="date"
        label="建档日期"
        rules={[
          {
            required: true,
            message: '请选择建档日期',
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Divider orientation="left" plain>
        患者信息
      </Divider>
      <Form.Item
        name="name"
        label="患者姓名"
        rules={[
          {
            required: true,
            message: '请输入患者姓名',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="origin"
        label="患者来源"
        rules={[
          {
            required: true,
            message: '请选择患者来源',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="ID_number"
        label="身份证号"
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="age"
        label="患者年龄"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phone"
        label="联系方式"
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="gender"
        label="患者性别"
        rules={[{ required: true, message: 'Please select gender!' }]}
      >
        <Select placeholder="请选择性别">
          <Option value="男">男</Option>
          <Option value="女">女</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="adress"
        label="家庭地址"
        rules={[{ required: true, message: '请输入家庭住址' }]}
      >
        <Input style={{ width: '100%' }} />
      </Form.Item>
      <Divider orientation="left" plain>
        联系人资料
      </Divider>

      <Form.Item
        name="contact_name"
        label="联系人姓名"

      >
        <Input></Input>
      </Form.Item>

      <Form.Item
        name="contact_phone"
        label="联系人电话"

      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        name="contact_relation"
        label="与患者关系"
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        name="condition"
        label="身体状况"
      >
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>
      <Divider orientation="left" plain>
        病史描述
      </Divider>
      <Form.Item
        name="medical_history"
        label="病史说明"
      >
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>
      <Divider orientation="left" plain>
        医生信息
      </Divider>
      <Form.Item
        name="doctor"
        label="主治医师"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="department"
        label="科室"
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddPatient;