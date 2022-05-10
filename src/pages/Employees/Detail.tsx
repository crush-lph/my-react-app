import React, { useEffect } from 'react'
import { Badge, Descriptions, Drawer, Tag } from 'antd'
import moment from 'moment'
import { Idetial } from './index'

// interface Idetial {
//   name?: string;
//   adress: string;
//   degree: string;
//   department?: string;
//   email?: string;
//   avatar?: string;
//   entry_time?: string;
//   identity?: string;
//   gender?: string;
//   phone?: string | number;
//   major?: string;

// }

interface Iprops {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  detail: Idetial
}

export default function Detail({ visible, setVisible, detail }: Iprops) {
  // 关闭
  const handleClose = () => {
    setVisible(false)
  }

  // useEffect(() => {
  //   console.log(detail)
  // })

  return (
    <Drawer visible={visible} onClose={handleClose} width='50%' title='员工详情'>
      <Descriptions
        // title="Responsive Descriptions"
        bordered
        column={1}
      >
        <Descriptions.Item label="姓名">{detail.name}</Descriptions.Item>
        <Descriptions.Item label="性别">{detail.gender}</Descriptions.Item>
        <Descriptions.Item label="住址">{detail.adress}</Descriptions.Item>
        <Descriptions.Item label="职位">{detail.identity}</Descriptions.Item>
        <Descriptions.Item label="科室">{detail.department}</Descriptions.Item>
        <Descriptions.Item label="电话">{detail.phone}</Descriptions.Item>
        <Descriptions.Item label="邮箱">{detail.email}</Descriptions.Item>
        <Descriptions.Item label="专业">{detail.major}</Descriptions.Item>
        <Descriptions.Item label="学历"> {detail.degree}</Descriptions.Item>
        <Descriptions.Item label="角色">
          <Tag color='#87d068'>
            {detail.role_name}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="入职时间">{moment(detail.entry_time).format('YYYY年MM月DD日 H:mm:ss')}</Descriptions.Item>
      </Descriptions>
    </Drawer>
  )
}
