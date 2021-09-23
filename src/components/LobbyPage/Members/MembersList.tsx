import React from 'react';
import { Member } from '../../../models/GameInfoAggregate/GameInfoModel';
import UserCard from '../UserCard/UserCard';
import './membersList.scss';

type MembersListPropsType = {
  members: Member[];
};

function MembersList(props: MembersListPropsType): JSX.Element {
  const { members } = props;
  const currentPlayer = members.find(
    member => member.id === localStorage.getItem('userId'),
  );

  return (
    <>
      <h2 className="lobby-title">Members:</h2>
      <div className="members-list">
        {members.map(member => (
          <UserCard
            key={member.id}
            firstName={member.firstName}
            lastName={member.lastName}
            isOwner={member.isOwner}
            userRole={member.userRole}
            imagePath={member.imagePath}
            jobPosition={member.jobPosition}
            id={member.id}
            isCurrentPlayerMaster={currentPlayer?.isOwner}
          />
        ))}
      </div>
    </>
  );
}

export default MembersList;
