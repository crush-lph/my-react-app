import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Radio, Input, Select, DatePicker, Row, Col, Divider, message } from 'antd';
import { degreeList, departmentList, isRequired, emailRule } from './constants'
import { Rule } from 'antd/lib/form';
import { useStore } from '@/store'
import { http } from '@/utils';
import { isFunction } from 'mobx/dist/internal';
import { IRole } from '../Rights/Role'
import { Idetial } from './index'
import moment from 'moment';
const { Option } = Select

interface Iprops {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  type: string | undefined;
  getList: () => void;
  user?: Idetial;
}

const App = ({ user, visible, setIsModalVisible, type, getList }: Iprops) => {
  const [form] = Form.useForm();
  const [gender, setGenger] = useState<'male' | 'female' | undefined>()
  const [roleList, setRoleList] = useState<IRole[]>([])
  const { UserStore } = useStore()

  const handleOk = () => {
    form.validateFields().then(async res => {
      // UserStore.addUser(res).then(result => {
      //   // console.log('嗯嗯嗯');
      //   console.log(result)
      // })

      switch (type) {
        case 'add':
          http.post('/api/users/register', res).then((result: any) => {
            if (result.data.code === 1) {
              message.error(result.data.msg)
            } else {
              message.success('注册成功')
              getList()
              setIsModalVisible(false)
            }
          });
          break;
        case 'edit':
          http.post('/api/users/update', { ...res, _id: user?._id }).then((result: any) => {
            if (result.data.code === 1) {
              message.error(result.data.msg)
            } else {
              message.success('注册成功')
              getList()
              setIsModalVisible(false)
            }
          });
          break;
        default: break;
      }

    }).catch(e => {
      console.log('请完善表单数据', e);
    })
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    // 获取角色列表
    getRoleList()
    // user && form.setFieldsValue(user);
    // console.log(user)
    type == 'edit' && form.setFieldsValue({
      ...user,
      entry_time: moment(user?.entry_time)
    })
  }, [])

  const getRoleList = () => {
    http.get('/api/role').then(res => {
      if (res.data.code === 0) {
        const role = res.data.data.filter((item: any) => item.isAuth == 1)
        setRoleList(role)
      } else {
        setRoleList([])
      }
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <>
      <Modal title={type == 'add' ? '添加用户' : '编辑用户信息'}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
        width={600}
      >
        <Form
          layout='horizontal'
          form={form}

        >
          <Row>
            <Col span={12} >
              <Form.Item name='name' label="姓名"
                // rules={[{ required: true }]}
                rules={isRequired('请输入姓名')}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}>
                <Input placeholder="请输入姓名" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='gender' label="性别"
                rules={isRequired('请选择性别')} labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}>
                <Radio.Group onChange={(e) => {
                  setGenger(e.target.value)
                }} value={gender}>
                  <Radio value='男'>男</Radio>
                  <Radio value='女'>女</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item name='degree' label="学历" labelCol={{ span: 8 }}>
                <Select placeholder="请选择学历" allowClear>
                  {
                    degreeList.map(item => (
                      <Option key={item.value} value={item.value}>{item.label}</Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='major' label="专业" labelCol={{ span: 8 }}>
                <Input placeholder="请输入所学专业" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name='phone' rules={isRequired('请输入联系方式')} label="联系方式" labelCol={{ span: 4 }} required>
            <Input placeholder="请输入联系方式" />
          </Form.Item>
          <Form.Item name='adress' rules={isRequired('请输入居住地址')} label="地址" labelCol={{ span: 4 }}>
            <Input placeholder="请输入居住地址" />
          </Form.Item>
          <Form.Item
            name="email"
            label="邮箱"
            labelCol={{ span: 4 }}
            rules={emailRule as Rule[]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          <Divider></Divider>
          <Row>
            <Col span={12}>
              <Form.Item label="职位" name="identity"
                rules={isRequired('请选择职位')}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}>
                <Select>
                  <Option value='doctor'>医生</Option>
                  <Option value='nurse'>护士</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='department' label="科室" labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                rules={isRequired('请选择科室')}>
                <Select placeholder="请选择科室" allowClear>
                  {departmentList.map(item => (
                    <Option key={item.value} value={item.value}>{item.label}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item name='entry_time'
                rules={isRequired('请选择入职时间')}
                label="入职时间" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                <DatePicker placeholder="请选择入职时间" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='role_id'
                rules={isRequired('请选择角色')}
                label="分配角色" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                <Select placeholder="请选择角色" allowClear>
                  {
                    roleList.map((item: IRole) => (
                      <Option key={item._id} value={item._id}>{item.name}</Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default App;