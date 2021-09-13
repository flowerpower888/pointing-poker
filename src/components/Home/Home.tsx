import React, { FC, useState } from 'react';
import Search from 'antd/lib/input/Search';
import { Button, Typography } from 'antd';
import Text from 'antd/lib/typography/Text';
import siteName from '../../assets/siteName.png';
import styles from './Home.module.scss';
import gameAPI from '../../api/gameAPI';
import LobbyForm from '../LobbyForm';

const { Title } = Typography;

const Home: FC = () => {
  const [isPopupShown, setIsPopupShown] = useState<boolean>(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isErrorShown, setIsErrorShown] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const closePopup = () => {
    setIsPopupShown(false);
  };

  const onClickStart = async () => {
    setIsOwner(true);
    setIsPopupShown(true);
  };

  const searchGame = async (id: string) => {
    if (id === '') {
      setIsErrorShown(true);
    } else {
      setIsLoading(true);
      try {
        await gameAPI.getGameInfo(id);
        setIsErrorShown(false);
        setIsPopupShown(true);
      } catch {
        setIsErrorShown(true);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <div className={styles.home}>
      <div className={styles.siteName}>
        <img src={siteName} alt="site name" />
      </div>
      <div className={styles.container}>
        <Title level={2} style={{ color: '#66999B', marginBottom: '68px' }}>
          Start your planning:
        </Title>
        <div className={styles.firstStroke}>
          <Text className={styles.text}>Create session:</Text>
          <Button
            type="primary"
            className={styles.button}
            size="large"
            onClick={onClickStart}
          >
            Start new game
          </Button>
        </div>
        <Title
          level={2}
          style={{
            color: '#66999B',
            marginBottom: '35px',
            textAlign: 'center',
          }}
        >
          OR:
        </Title>
        <Text className={styles.text}>
          Connect to lobby by <span className={styles.marked}>URL</span>:
        </Text>
        <div className={styles.secondStroke}>
          <Search
            allowClear
            size="large"
            enterButton="Connect"
            className={styles.search}
            onSearch={e => searchGame(e)}
            loading={isLoading}
          />
          {isErrorShown && (
            <div className={styles.error}>Not found this game</div>
          )}
        </div>
      </div>
      {isPopupShown && <LobbyForm isOwner={isOwner} closePopup={closePopup} />}
    </div>
  );
};

export default Home;
