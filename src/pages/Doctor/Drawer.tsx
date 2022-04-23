import React, { useState } from 'react';
import { Drawer, Button } from 'antd';

interface Iprops {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyDrawer = ({ visible, setVisible }: Iprops) => {
  // const [visible, setVisible] = useState<boolean>(false);
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Drawer title="详细信息" placement="right" onClose={onClose} visible={visible}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default MyDrawer;