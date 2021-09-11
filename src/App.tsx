import React from 'react';
import './App.scss';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import LobbyPage from './components/LobbyPage';
import GamePage from './components/GamePage';

const App: React.FunctionComponent = () => (
  <>
    <Header />
    {/* <Home /> */}
    {/* <LobbyPage /> */}
    <GamePage />
    <Footer />
  </>
);

export default App;
