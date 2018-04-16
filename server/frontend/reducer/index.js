import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import contracts from './contracts';
import teams from './teams';
import countries from './countries';
import playersOfTeam from './playersOfTeam';
import contract from './player';
import user from './user';

export default combineReducers({
  routing: routerReducer,
  contracts,
  teams,
  countries,
  playersOfTeam,
  contract,
  user,
});
