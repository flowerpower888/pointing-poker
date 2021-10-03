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
      title={`${kickProposeByFirstName} ${kickProposeByLastName} wants to kick member ${playerToKickFirstName} ${playerToKickLastName}.
    Do you agree with it?`}
      okText="Yes"
      okType="danger"
      cancelText="No"
      visible={showModal}
      onOk={() => sendVote(true)}
      onCancel={() => sendVote(false)}
      centered
      maskClosable
    />
  );
}
export default KickByVotes;
