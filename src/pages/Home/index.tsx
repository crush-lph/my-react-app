import { Card, Col, Row } from 'antd'
import React from 'react'
import './index.less'

export default function Home() {
  return (
    <div className='dashbord'>
      <div className="header">

        <Card>
          员工数量
        </Card>
        <Card>
          患者数量
        </Card>
      </div>
    </div>
  )
}
