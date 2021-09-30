import { Button, Modal, Typography } from 'antd';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import memberAPI from '../../../api/memberAPI';
import { Member } from '../../../models/GameInfoAggregate/GameInfoModel';
import styles from './admittingUserPopup.module.scss';

const { Title } = Typography;

type AdmittingUserPopupType = {
  waitingPlayer: Member;
  isVisible?: boolean;
  setWaitingPlayer: React.Dispatch<React.SetStateAction<Member | null>>;
};

const AdmittingUserPopup: FC<AdmittingUserPopupType> = ({
  waitingPlayer,
  isVisible = false,
  setWaitingPlayer,
}) => {
  const { gameId } = useParams<{ gameId: string }>();
  const admitUser = () => {
    if (waitingPlayer.id) {
      memberAPI.update(gameId, waitingPlayer.id, {
        userStatus: 'admitted',
      });
    }
    setWaitingPlayer(null);
  };
  const rejectUser = () => {
    if (waitingPlayer.id) {
      memberAPI.update(gameId, waitingPlayer.id, {
        userStatus: 'rejected',
      });
    }
    setWaitingPlayer(null);
  };
  return (
    <Modal title="Admitting a user" visible={isVisible} footer={null}>
      <Title level={3} className={styles.title}>
        Do you want to admit {waitingPlayer.firstName}
        {waitingPlayer.lastName}?
      </Title>
      <div className={styles.buttons}>
        <Button
          type="primary"
          onClick={admitUser}
          size="large"
          className={styles.btn}
        >
          Admit
        </Button>
        <Button onClick={rejectUser} size="large" className={styles.btn}>
          Reject
        </Button>
      </div>
    </Modal>
  );
};

export default AdmittingUserPopup;
