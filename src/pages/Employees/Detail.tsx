import React from 'react'
import { Drawer } from 'antd'

interface Iprops {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  detail: object
}

export default function Detail({ visible, setVisible, detail }: Iprops) {
  // 关闭
  const handleClose = () => {
    setVisible(false)
  }

  return (
    <Drawer visible={visible} onClose={handleClose} width='50%'>

    </Drawer>
  )
}
