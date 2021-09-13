import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import LobbyPage from './components/LobbyPage';

const App: React.FunctionComponent = () => (
  <HashRouter>
    <Header />
    <Switch>
      <Route
        path="/lobby/:position"
        render={({
          match: {
            params: { position },
          },
        }) => <LobbyPage position={position} />}
      />
      <Route exact path="/" render={() => <Home />} />
    </Switch>
    <Footer />
  </HashRouter>
);

export default App;
