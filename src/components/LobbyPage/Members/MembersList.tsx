import * as React from 'react';
import { Member } from '../../../types/types';
import UserCard from '../UserCard/UserCard';
import './membersList.scss';

type MembersListPropsType = {
  users: Member[];
};

function MembersList(props: MembersListPropsType): JSX.Element {
  const { users } = props;
  return (
    <>
      <h2 className="lobby-title">Members:</h2>
      <div className="members-list">
        {users.map(el => (
          <UserCard
            key={Date.now()}
            firstName={el.firstName}
            lastName={el.lastName}
            isOwner={el.isOwner}
            userRole={el.userRole}
            imagePath={el.imagePath}
            jobPosition={el.jobPosition}
          />
        ))}
      </div>
    </>
  );
}
export default MembersList;
