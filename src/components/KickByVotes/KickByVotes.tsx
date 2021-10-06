import React from 'react';
import { Modal } from 'antd';
import { Member } from '../../models/GameInfoAggregate/GameInfoModel';
import kickByVoteAPI from '../../api/kickByVoteAPI';

function KickByVotes(
  kickProposeBy: Member,
  playerToKick: Member,
  showModal: boolean,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
): JSX.Element {
  const { firstName: kickProposeByFirstName, lastName: kickProposeByLastName } =
    kickProposeBy;
  const { firstName: playerToKickFirstName, lastName: playerToKickLastName } =
    playerToKick;

  function sendVote(vote: boolean): void {
    const gameId = localStorage.getItem('gameId');
    if (gameId && playerToKick.id && kickProposeBy.id) {
      kickByVoteAPI.sendVotes(
        gameId,
        playerToKick.id,
        kickProposeBy.id,
        'voting',
        vote,
      );
    }
    setShowModal(false);
  }
  return (
    <Modal
      title={
        <p
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center',
          }}
        >
          Kick
        </p>
      }
      okText="Yes"
      okType="danger"
      cancelText="No"
      visible={showModal}
      onOk={() => sendVote(true)}
      onCancel={() => sendVote(false)}
      centered
      maskClosable
    >
      <p style={{ fontSize: 16 }}>
        <span style={{ color: '#66999b' }}>
          {kickProposeByFirstName} {kickProposeByLastName || ''}
        </span>{' '}
        wants to kick member{' '}
        <span style={{ color: '#66999b' }}>
          {playerToKickFirstName} {playerToKickLastName || ''}
        </span>
        ! Do you agree with it?
      </p>
    </Modal>
  );
}
export default KickByVotes;
