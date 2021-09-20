import React, { useState } from 'react';
import { Button, Col } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import UserCard from './UserCard';
import MembersList from './Members';
import Issues from './Issues';
import { GameInfo, Issue } from '../../models/GameInfoAggregate/GameInfoModel';
import './lobbyPage.scss';

type Game = {
  info: GameInfo;
};

function LobbyPage(props: Game): JSX.Element {
  const { info: gameInfo } = props;
  const [issueList, setIssueList] = useState<string[]>(
    gameInfo.tasks.map(task => task.title),
  );
  const owner = gameInfo.members.find(member => member.isOwner) || null;
  const players = gameInfo.members.filter(member => !member.isOwner);
  const isUserAnOwner = owner
    ? owner.id === localStorage.getItem('userId')
    : false;

  return (
    <div className="lobby-page">
      {owner && (
        <>
          <h2 className="lobby-title"> Spring planning</h2>

          <div className="card_container">
            <Col span={10}>
              <UserCard
                isOwner={owner.isOwner}
                imagePath={owner.imagePath}
                firstName={owner.firstName}
                lastName={owner.lastName}
                userRole={owner.userRole}
                jobPosition={owner.jobPosition}
              />
            </Col>
            <Col>
              <Paragraph
                className="lobby-copy-link"
                copyable={{ text: `${gameInfo.id}` }}
              >
                Link to share
              </Paragraph>
            </Col>
          </div>

          <div className="lobby-page_btn-container">
            {isUserAnOwner ? (
              <>
                <Button className="lobby-btn scram" type="primary" size="large">
                  Start game
                </Button>
                <Button className="lobby-btn" type="default" size="large">
                  Cancel game
                </Button>
              </>
            ) : (
              <Button className="lobby-btn player" type="default" size="large">
                Exit
              </Button>
            )}
          </div>

          <MembersList members={players} />

          {isUserAnOwner && issueList && (
            <Issues issueList={issueList} setIssueList={setIssueList} />
          )}
        </>
      )}
    </div>
  );
}

export default LobbyPage;
