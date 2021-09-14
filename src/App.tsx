import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import LobbyPage from './components/LobbyPage';

const App: React.FunctionComponent = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path="/:gameId">
        <LobbyPage />
      </Route>
      <Route exact path="/" render={() => <Home />} />
    </Switch>
    <Footer />
  </BrowserRouter>
);

export default App;
