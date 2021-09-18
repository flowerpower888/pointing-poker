import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Col } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import Preloader from '../common/Preloader/Preloader';
import UserCard from './UserCard';
import MembersList from './Members';
import Issues from './Issues';
import issues from '../../utils/issues';
import gameAPI from '../../api/gameAPI';
import { GameInfo, Member } from '../../models/GameInfoAggregate/GameInfoModel';
import './lobbyPage.scss';

type GameParams = {
  gameId: string;
};

function LobbyPage(): JSX.Element {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { gameId } = useParams<GameParams>();
  const [gameData, setGameData] = useState({} as GameInfo);
  const [owner, setOwner] = useState<Member | null>(null);
  const [players, setPlayers] = useState<Member[]>([]);
  const [issueList, setIssueList] = useState<string[]>([]);
  // const [gameStatus, setGameStatus] = useState('created');

  useEffect(() => {
    const getGameInfo = async () =>
      gameAPI.getGameInfo(gameId).then(res => {
        const { data } = res;

        setGameData(data);
        setOwner(data.members.find(member => member.isOwner) || null);
        setPlayers(data.members.filter(member => !member.isOwner));
        setIssueList(issues);
        setIsLoaded(true);
      });

    getGameInfo();
  }, [gameId]);
  // TODO: add checking game status to render lobby or game page

  return (
    <div className="lobby-page">
      {!isLoaded ? (
        <Preloader />
      ) : (
        owner && (
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
                  copyable={{ text: `${gameId}` }}
                >
                  Link to share
                </Paragraph>
              </Col>
            </div>

            <div className="lobby-page_btn-container">
              {owner.isOwner ? (
                <>
                  <Button
                    className="lobby-btn scram"
                    type="primary"
                    size="large"
                  >
                    Start game
                  </Button>
                  <Button className="lobby-btn" type="default" size="large">
                    Cancel game
                  </Button>
                </>
              ) : (
                <Button
                  className="lobby-btn player"
                  type="default"
                  size="large"
                >
                  Exit
                </Button>
              )}
            </div>

            <MembersList members={players} />

            {owner.isOwner && issueList && (
              <Issues issueList={issueList} setIssueList={setIssueList} />
            )}
          </>
        )
      )}
    </div>
  );
}

export default LobbyPage;
