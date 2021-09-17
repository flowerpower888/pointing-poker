import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import styles from './header.module.scss';

const Header: FC = () => (
  <header className={styles.header}>
    <div className={styles.firstLine} />
    <div className={styles.secondLine} />
    <Link to="/" className={styles.link}>
      <img src={logo} alt="logo" />
    </Link>
  </header>
);

export default Header;
