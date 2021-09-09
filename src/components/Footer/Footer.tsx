import React from 'react';
import Title from 'antd/lib/typography/Title';
import { List, Avatar } from 'antd';
import styles from './Footer.module.scss';

const Footer = () => {
  const members = [
    {
      id: 0,
      github: 'https://github.com/helenakrasnova',
      imgUrl: 'https://avatars.githubusercontent.com/u/44213581?v=4',
      name: 'Alena Krasnova',
      role: 'Mentor',
    },
    {
      id: 1,
      github: 'https://github.com/flowerpower888',
      imgUrl: 'https://avatars.githubusercontent.com/u/53803736?v=4',
      name: 'Maria Romantsova',
      role: 'Member',
    },
    {
      id: 2,
      github: 'https://github.com/imyzhuk',
      imgUrl:
        'https://avatars.githubusercontent.com/u/73237985?s=400&u=faddf0dc7daba7e1e735dab5135f973a4b929342&v=4',
      name: 'Maksim Zhuk',
      role: 'Member',
    },
    {
      id: 3,
      github: 'https://github.com/kathrinematveeva',
      imgUrl: 'https://avatars.githubusercontent.com/u/70895448?v=4',
      name: 'Kathrine Matveeva',
      role: 'Member',
    },
  ];
  return (
    <footer className={styles.footer}>
      <List
        size="large"
        bordered
        header={
          <>
            <Title level={3}>Our school:</Title>
            <div className={styles.rsschool}>
              <a href="https://rs.school/react/">
                <img
                  src="https://rs.school/images/rs_school_js.svg"
                  alt="RS School React"
                />
              </a>
            </div>
            <Title level={3}>Created in 2021 by: </Title>
          </>
        }
        dataSource={members}
        renderItem={item => (
          <List.Item key={item.id}>
            <List.Item.Meta
              avatar={<Avatar src={item.imgUrl} size="large" alt={item.name} />}
              title={<a href={item.github}>{item.name}</a>}
              description={item.role}
            />
          </List.Item>
        )}
      />
    </footer>
  );
};

export default Footer;
