import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import ListOfContracts from './components/listOfContracts';
import ListOfTeam from './components/listOfTeam';
import ListOfCountries from './components/listOfCountries';
import Player from './components/player';
import Home from './components/home';
import { Switch } from 'react-router-dom';
import Favorite from './components/favorite';

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/players" component={ListOfContracts}/>
        <Route path="/players/team/:teamId" component={ListOfContracts}/>
        <Route path="/players/country/:countryId" component={ListOfContracts}/>
        <Route path="/player/:id" component={Player}/>
        <Route path="/teams" component={ListOfTeam}/>
        <Route path="/countries" component={ListOfCountries}/>
        <Route path="/favorite" component={Favorite}/>
        <Route path="*" component={Home}/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
