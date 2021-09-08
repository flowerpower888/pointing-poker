import * as React from 'react';
import UserCard, { UserData } from '../UserCard/UserCard';
import './membersList.css';

function MembersList(props: { users: UserData[] }): JSX.Element {
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
            userRole={el.userRole}
            avatar={el.avatar}
            position={el.position}
          />
        ))}
      </div>
    </>
  );
}
export default MembersList;