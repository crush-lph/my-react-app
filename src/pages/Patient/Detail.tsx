import React, { useEffect } from 'react'
import { Badge, Descriptions, Drawer, Tag } from 'antd'
import moment from 'moment'
import { Ipatient } from './AddPatient'


interface Iprops {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  detail: Ipatient
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
    <Drawer visible={visible} onClose={handleClose} width='50%' title='患者详情'>
      <Descriptions
        // title="Responsive Descriptions"
        bordered
        column={1}
      >
        <Descriptions.Item label="建档时间">{moment(detail.date).format('YYYY年MM月DD日 H:mm:ss')}</Descriptions.Item>
        <Descriptions.Item label="姓名">{detail.name}</Descriptions.Item>
        <Descriptions.Item label="性别">{detail.gender}</Descriptions.Item>
        <Descriptions.Item label="住址">{detail.adress}</Descriptions.Item>
        <Descriptions.Item label="患者来源">{detail.origin}</Descriptions.Item>
        <Descriptions.Item label="科室">{detail.department}</Descriptions.Item>
        <Descriptions.Item label="电话">{detail.phone}</Descriptions.Item>
        <Descriptions.Item label="联系方式">{detail.phone}</Descriptions.Item>
        <Descriptions.Item label="联系人电话">{detail.contact_phone}</Descriptions.Item>
        <Descriptions.Item label="联系人姓名"> {detail.contact_name}</Descriptions.Item>


      </Descriptions>

    </Drawer>
  )
}
