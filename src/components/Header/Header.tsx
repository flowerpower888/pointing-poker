import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../assets/logo.png';

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
