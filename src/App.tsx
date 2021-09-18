import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './app.scss';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import MainPage from './components/MainPage/MainPage';

const App: React.FunctionComponent = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path="/:gameId">
        <MainPage />
      </Route>
      <Route exact path="/" render={() => <Home />} />
    </Switch>
    <Footer />
  </BrowserRouter>
);

export default App;
