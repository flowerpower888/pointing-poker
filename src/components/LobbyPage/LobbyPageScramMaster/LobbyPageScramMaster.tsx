import React, { useState } from 'react';
import { Button } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import UserCard from '../UserCard/UserCard';
import MembersList from '../Members/MembersList';
import 'antd/dist/antd.css';
import './lobbyPageScramMaster.css';
import members from '../ConstantsHardCode';
import Issues from '../Issues/Issues';
import issues from '../../../shared/issues';

function LobbyPageScramMaster(): JSX.Element {
  const [issueList, setIssueList] = useState(issues);

  return (
    <>
      <h2 className="lobby-title"> Spring planning</h2>
      <div className="scram-card_container">
        <UserCard
          imagePath=""
          firstName="User"
          lastName="Name"
          userRole="scram master"
          jobPosition="student"
        />
        <Paragraph
          className="lobby-copy-link"
          copyable={{ text: 'base url + game ID' }}
        >
          Link to share
        </Paragraph>
      </div>

      <div className="lobby-page_btn-container scram-page">
        <Button
          className="lobby-exit-btn lobby-exit-btn_scram "
          type="primary"
          size="large"
        >
          Start game
        </Button>
        <Button className="lobby-exit-btn" type="default" size="large">
          Cancel game
        </Button>
      </div>
      <MembersList users={members} />
      <Issues issueList={issueList} setIssueList={setIssueList} />
    </>
  );
}

export default LobbyPageScramMaster;
