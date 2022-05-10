import React from 'react'
import { Button, Card, Checkbox, Form, Input, message } from 'antd'
import './index.less'
import { useNavigate } from 'react-router-dom'
import { useStore } from '@/store'

export default function Login() {
  const navigate = useNavigate()
  const { LoginStore } = useStore()
  const onFinish = async (values: any) => {
    // @ts-ignore
    try {
      await LoginStore.login(values)
      navigate('/', { replace: true })
      // message.success('登录成功')
    } catch (e) {
      message.error('登录失败')
    }
  };

  return (
    <div className='login'>
      <Card className='login-container'>
        <div className='login-logo'>
        </div>
        <Form
          onFinish={onFinish}
        >
          <Form.Item
            name='username'
            rules={[
              {
                required: true,
                message: '请输入用户名'
              }]}>
            <Input size='large' placeholder='请输入用户名' />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: '请输入密码'
              }
            ]}>
            <Input type='password' size='large' placeholder='请输入密码' />
          </Form.Item>
          <Form.Item >
            <Checkbox>同意</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size='large'
              block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
