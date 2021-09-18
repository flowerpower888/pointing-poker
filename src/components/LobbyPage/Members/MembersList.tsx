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
        {members.map(member => {
          const {
            firstName,
            lastName,
            isOwner,
            userRole,
            imagePath,
            jobPosition,
            id,
          } = member;

          return (
            <UserCard
              key={id}
              firstName={firstName}
              lastName={lastName}
              isOwner={isOwner}
              userRole={userRole}
              imagePath={imagePath}
              jobPosition={jobPosition}
            />
          );
        })}
      </div>
    </>
  );
}

export default MembersList;
