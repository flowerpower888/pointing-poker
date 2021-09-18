import React from 'react';
import { Button, Modal, Typography } from 'antd';
import styles from './kickingPlayerPopup.module.scss';

const KickingPlayerPopup = () => {
  const { Title, Text } = Typography;

  const onFinish = () => console.log('finish');
  const onCancel = () => console.log('cancel');
  return (
    <Modal visible onCancel={onCancel} footer={null}>
      <Title className={styles.title}>Kick player?</Title>
      <Text className={styles.text}>
        Are you really want to remove player
        <span className={styles.player}> David Blane </span>from game session?
      </Text>
      <div className={styles.buttons}>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className={styles.btn}
          onClick={onFinish}
        >
          Yes
        </Button>
        <Button
          htmlType="button"
          onClick={onCancel}
          size="large"
          className={styles.btn}
        >
          No
        </Button>
      </div>
    </Modal>
  );
};

export default KickingPlayerPopup;
