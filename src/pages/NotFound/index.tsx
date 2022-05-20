import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import './index.less'

export default function NotFound() {
  return (
    <div className='not-found'>
      <div className="img"></div>
      <Button>
        <Link to='/'>返回首页</Link>
      </Button>
    </div>
  )
}
