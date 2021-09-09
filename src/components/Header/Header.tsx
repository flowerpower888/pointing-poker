import React from 'react';
import styles from './Header.module.scss';
import logo from '../../assets/logo.png';

const Header = () => (
  <header className={styles.header}>
    <div className={styles.firstLine} />
    <div className={styles.secondLine} />
    <a href="/" className={styles.link}>
      <img src={logo} alt="logo" />
    </a>
  </header>
);

export default Header;
