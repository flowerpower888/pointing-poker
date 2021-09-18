import React, { useState } from 'react';
import { Button, Col } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import UserCard from './UserCard';
import MembersList from './Members';
import Issues from './Issues';
import issues from '../../utils/issues';
import { GameInfo } from '../../models/GameInfoAggregate/GameInfoModel';
import './lobbyPage.scss';

type Game = {
  info: GameInfo;
};

function LobbyPage(props: Game): JSX.Element {
  const { info: gameInfo } = props;

  const owner = gameInfo.members.find(member => member.isOwner) || null;
  const players = gameInfo.members.filter(member => !member.isOwner) || [];
  const [issueList, setIssueList] = useState(issues);
  // const [gameStatus, setGameStatus] = useState('created');

  // TODO: add checking game status to render lobby or game page

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
            {owner.isOwner ? (
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

          {owner.isOwner && issueList && (
            <Issues issueList={issueList} setIssueList={setIssueList} />
          )}
        </>
      )}
    </div>
  );
}

export default LobbyPage;
