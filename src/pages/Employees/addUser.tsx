import React, { useState } from 'react';
import { Modal, Button, Form, Radio, Input, Select, DatePicker } from 'antd';
interface Iprops {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

type LayoutType = Parameters<typeof Form>[0]['layout'];

const { Option } = Select

const App = ({ visible, setIsModalVisible }: Iprops) => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    formLayout === 'horizontal'
      ? {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      }
      : null;

  const buttonItemLayout =
    formLayout === 'horizontal'
      ? {
        wrapperCol: { span: 14, offset: 4 },
      }
      : null;



  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal title="添加用户"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
        width={600}
      >
        <Form
          {...formItemLayout}
          layout={formLayout}
          form={form}
          initialValues={{ layout: formLayout }}
          onValuesChange={onFormLayoutChange}
        >
          <Form.Item label="职位" name="layout">
            <Radio.Group value={formLayout}>
              <Select>
                <Option value='doctor'>医生</Option>
                <Option value='nurse'>护士</Option>
              </Select>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="姓名">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="入职时间">
            <DatePicker placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="科室">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="地址">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="性别">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="联系方式">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="学历">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="联系方式">
            <Input placeholder="input placeholder" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default App;