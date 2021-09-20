import React from 'react';
import { Member } from '../../../models/GameInfoAggregate/GameInfoModel';
import UserCard from '../UserCard/UserCard';
import './membersList.scss';

type MembersListPropsType = {
  members: Member[];
};

function MembersList(props: MembersListPropsType): JSX.Element {
  const { members } = props;
  return (
    <>
      <h2 className="lobby-title">Members:</h2>
      <div className="members-list">
        {members.map(el => (
          <UserCard
            key={el.id}
            firstName={el.firstName}
            lastName={el.lastName}
            isOwner={el.isOwner}
            userRole={el.userRole}
            imagePath={el.imagePath}
            jobPosition={el.jobPosition}
            id={el.id}
          />
        ))}
      </div>
    </>
  );
}

export default MembersList;
