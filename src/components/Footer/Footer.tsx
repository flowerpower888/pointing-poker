import React, { FC } from 'react';
import Title from 'antd/lib/typography/Title';
import { Row, Col } from 'antd';
import { GithubFilled, YoutubeOutlined } from '@ant-design/icons';
import styles from './footer.module.scss';

const Footer: FC = () => {
  const members = [
    {
      id: 0,
      github: 'https://github.com/helenakrasnova',
      imgUrl: 'https://avatars.githubusercontent.com/u/44213581?v=4',
      name: 'Alena Krasnova',
      role: 'mentor',
    },
    {
      id: 1,
      github: 'https://github.com/flowerpower888',
      imgUrl: 'https://avatars.githubusercontent.com/u/53803736?v=4',
      name: 'Maria Romantsova',
      role: 'member',
    },
    {
      id: 2,
      github: 'https://github.com/imyzhuk',
      imgUrl:
        'https://avatars.githubusercontent.com/u/73237985?s=400&u=faddf0dc7daba7e1e735dab5135f973a4b929342&v=4',
      name: 'Maksim Zhuk',
      role: 'member',
    },
    {
      id: 3,
      github: 'https://github.com/kathrinematveeva',
      imgUrl: 'https://avatars.githubusercontent.com/u/70895448?v=4',
      name: 'Kathrine Matveyeva',
      role: 'member',
    },
  ];
  return (
    <footer className={styles.footer}>
      <Row>
        <Col span={6}>
          <Title level={4} style={{ color: 'white' }}>
            Created by:
          </Title>
          {members.map(el =>
            el.role === 'member' ? (
              <div key={el.id} className={styles.member}>
                {el.name}
                <a href={el.github} style={{ color: 'white' }}>
                  <GithubFilled className={styles.gitIcon} />
                </a>
              </div>
            ) : (
              ''
            ),
          )}
        </Col>
        <Col span={6}>
          <Title level={4} style={{ color: 'white' }}>
            Mentor:
          </Title>
          {members.map(el =>
            el.role === 'mentor' ? (
              <div key={el.id} className={styles.member}>
                {el.name}
                <a href={el.github} style={{ color: 'white' }}>
                  <GithubFilled className={styles.gitIcon} />
                </a>
              </div>
            ) : (
              ''
            ),
          )}
        </Col>
        <Col span={6} style={{ display: 'flex' }} className={styles.date}>
          2021
        </Col>
        <Col span={6} style={{ display: 'flex' }} className={styles.schoolLink}>
          <a href="https://rs.school/react/" className={styles.link}>
            q
          </a>
          <div>Watch our review here:</div>
          <a
            href="https://www.youtube.com/watch?v=X3BykU-BqXE&ab_channel=KaterinaMatveyeva"
            className={styles.linkYoutube}
          >
            <YoutubeOutlined style={{ fontSize: 30 }} />
          </a>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
