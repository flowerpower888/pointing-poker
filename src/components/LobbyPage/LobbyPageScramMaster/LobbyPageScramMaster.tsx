import * as React from 'react';
import { Button } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import { useState } from 'react';
import UserCard from '../UserCard/UserCard';
import MembersList from '../Members/MembersList';
import 'antd/dist/antd.css';
import './lobbyPageScramMaster.css';
import Issues from '../Issues/Issues';
import { GameInfo } from '../../../types/types';

type Game = {
  info: GameInfo;
};

// TODO replace all path to constants

function LobbyPageScramMaster(props: Game): JSX.Element {
  const { info } = props;
  const gameId = info.id;
  const scrumMaster = info.members.filter(el => el.isOwner)[0];
  const members = info.members.filter(el => !el.isOwner);
  const [issueList, setIssueList] = useState(info.tasks);
  return (
    <>
      <h2 className="lobby-title"> Spring planning</h2>
      <div className="scram-card_container">
        <UserCard
          isOwner
          imagePath={scrumMaster.imagePath}
          firstName={scrumMaster.firstName}
          lastName={scrumMaster.lastName}
          userRole={scrumMaster.userRole}
          jobPosition={scrumMaster.jobPosition}
        />
        <Paragraph
          className="lobby-copy-link"
          copyable={{ text: `localhost:3000/${gameId}` }}
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
