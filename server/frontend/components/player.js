import React, { Component } from 'react';
import Img from 'react-image';
import { connect } from 'react-redux';
import './css/listOfCountries.css';
import './css/listOfContracts.css';
import './css/player.css';
import Head from './part/head';
import player from "../reducer/player";
import $ from "jquery";

const urlOnDataLoad = "/main/contracts/";
const urlOnUserName = "/main/user/";

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
      login: '',
    };
    this.loadName = this.loadName.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
  }

  componentDidMount() {
    this.loadName();
    this.addPlayer(this.props.params.id);
  }

  addPlayer(id) {
    $.ajax({
      url: (urlOnDataLoad + id),
      dataType: 'json',
      cache: false,
      success: function (data) {
        console.log(data);
        if (data.characteristics != null) {
          this.props.onAddPlayer(data);
        }
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(urlOnDataLoad + id, status, err.toString());
      }
    });
  }

  loadName() {
    $.ajax({
      url: (urlOnUserName),
      dataType: 'json',
      cache: false,
      success: function (data) {
        console.log(data);
        if (data.login != null) {
          this.setState({isAuth: true});
          this.setState({login: data.login});
        }
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(urlOnUserName, status, err.toString());
      }
    });
  }

  commentSend(){
    $.ajax({
      type: "POST",
      url: '/main/add/comment/' + this.props.state[0].player.id + '/' + this.commentInput.value,
      cache: false,
      success: function (data) {
        this.setState({isAuth: true});
        this.addPlayer(this.props.params.id);
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(urlOnUserName, status, err.toString());
      }
    });
  }

  render() {
    return (
      <div>
        <Head login={this.state.login} isAuth={this.state.isAuth}/>
        <ul>
          {this.props.state.map((state) =>
            <li key={state.id.toString()}>
              <div class="content-header">
                <div class="content-header-left slash futhead">
                  <h1 class="player-list-header">
                    <small><br/></small>

                    <span>{state.player.name}</span>

                    <small>FIFA 18 • Rating</small>
                  </h1>
                </div>
              </div>
              <div class="player-group">
                <div class="player-cards">
                  <div class="fut18 playercard width-30 card-large  toty  gold center-block player-detail-card ">
                    <div class="playercard-picture"><img src={state.refImage}/></div>
                    <div class="playercard-rating"><span>RAT: {state.reiting}</span></div>
                  </div>
                  <div class="tab in width-70">
                    <div class="font-12 margin-t-16">
                      <h3 class="text-center">Info</h3>
                      <div class="row player-sidebar-item">
                        <div class="col-xs-7">

                          Club
                          <span class="pull-right"><img class="img-12"
                                                        src={state.team.refClubs}/></span>
                        </div>
                        <div class="col-xs-5 player-sidebar-value">{state.team.name}</div>
                      </div>
                      <div class="row player-sidebar-item">
                        <div class="col-xs-7">

                          Nation
                          <span class="pull-right"><img class="img-12"
                                                        src={state.player.country.refNations}/></span>
                        </div>
                        <div
                          class="col-xs-5 player-sidebar-value">{state.player.country.name}</div>
                      </div>
                      <div class="row player-sidebar-item">
                        <div class="col-xs-7">
                          Strong Foot
                        </div>
                        <div
                          class="col-xs-5 player-sidebar-value">{state.characteristics.strongFoot}</div>
                      </div>
                      <div class="row player-sidebar-item">
                        <div class="col-xs-7">
                          Age
                        </div>
                        <div
                          class="col-xs-5 player-sidebar-value">{state.characteristics.age}</div>
                      </div>
                      <div class="row player-sidebar-item">
                        <div class="col-xs-7">
                          Height
                        </div>
                        <div
                          class="col-xs-5 player-sidebar-value">{state.characteristics.height}</div>
                      </div>
                      <div class="row player-sidebar-item">
                        <div class="col-xs-7">
                          Workrates
                        </div>
                        <div
                          class="col-xs-5 player-sidebar-value">{state.characteristics.workrates}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="player-group">
                <div class="player-stats-igs row padding-0">
                  <div class="col-lg-2 col-sm-4 col-xs-6 igs-group">
                    <h5 class="text-center">Pace</h5>
                    <div id="attr1-chart" class="stat-chart stat-color-5 c3 text-center">
                      <h2 class="text-center">{state.pac}</h2>
                    </div>
                    <div class="divided-row player-stat-row sm">
                      <span class="player-stat-title">Acceleration</span>
                      <span
                        class="player-stat-value chembot-value stat-color-5 pull-right">{state.characteristics.acceleration}</span>
                    </div>
                    <div class="divided-row player-stat-row sm">
                      <span class="player-stat-title">Sprint Speed</span>
                      <span
                        class="player-stat-value chembot-value stat-color-5 pull-right">{state.characteristics.sprintSpeed}</span>
                    </div>
                  </div>
                  <div class="col-lg-2 col-sm-4 col-xs-6 igs-group">
                    <h5 class="text-center">Shooting</h5>
                    <div id="attr2-chart" class="stat-chart stat-color-5 c3 text-center">
                      <h2 class="text-center">{state.sho}</h2>
                    </div>
                    <div class="divided-row player-stat-row sm">
                      <span class="player-stat-title">Positioning</span>
                      <span
                        class="player-stat-value chembot-value stat-color-5 pull-right">{state.characteristics.positioning}</span>
                    </div>
                    <div class="divided-row player-stat-row sm">
                      <span class="player-stat-title">Finishing</span>
                      <span
                        class="player-stat-value chembot-value stat-color-5 pull-right">{state.characteristics.finishing}</span>
                    </div>
                    <div class="divided-row player-stat-row sm">
                      <span class="player-stat-title">Shot Power</span>
                      <span
                        class="player-stat-value chembot-value stat-color-5 pull-right">{state.characteristics.shotPower}</span>
                    </div>
                    <div class="divided-row player-stat-row sm">
                      <span class="player-stat-title">Long Shots</span>
                      <span
                        class="player-stat-value chembot-value stat-color-5 pull-right">{state.characteristics.longShots}</span>
                    </div>
                    <div class="divided-row player-stat-row sm">
                      <span class="player-stat-title">Volleys</span>
                      <span
                        class="player-stat-value chembot-value stat-color-5 pull-right">{state.characteristics.volleys}</span>
                    </div>
                    <div class="divided-row player-stat-row sm">
                      <span class="player-stat-title">Penalties</span>
                      <span
                        class="player-stat-value chembot-value stat-color-5 pull-right">{state.characteristics.penalties}</span>
                    </div>
                  </div>
                  <div class="col-lg-2 col-sm-4 col-xs-6 igs-group">
                    <h5 class="text-center">Passing</h5>
                    <div id="attr3-chart" class="stat-chart stat-color-5 c3 text-center">
                      <h2 class="text-center">{state.pas}</h2>
                    </div>
                    <div class="divided-row player-stat-row sm">
                      <span class="player-stat-title">Vision</span>
                      <span
                        class="player-stat-value chembot-value stat-color-5 pull-right">{state.characteristics.vision}</span>
                    </div>
                    <div class="divided-row player-stat-row sm">
                      <span class="player-stat-title">Crossing</span>
                      <span
                        class="player-stat-value chembot-value stat-color-5 pull-right">{state.characteristics.crossing}</span>
                    </div>
                    <div class="divided-row player-stat-row sm">
                      <span class="player-stat-title">Free Kick</span>
                      <span
                        class="player-stat-value chembot-value stat-color-5 pull-right">{state.characteristics.freeKick}</span>
                    </div>
                    <div class="divided-row player-stat-row sm">
                      <span class="player-stat-title">Short Passing</span>
                      <span
                        class="player-stat-value chembot-value stat-color-5 pull-right">{state.characteristics.shortPassing}</span>
                    </div>
                    <div class="divided-row player-stat-row sm">
                      <span class="player-stat-title">Long Passing</span>
                      <span
                        class="player-stat-value chembot-value stat-color-5 pull-right">{state.characteristics.longPassing}</span>
                    </div>
                    <div class="divided-row player-stat-row sm">
                      <span class="player-stat-title">Curve</span>
                      <span
                        class="player-stat-value chembot-value stat-color-5 pull-right">{state.characteristics.curve}</span>
                    </div>
                  </div>
                  <div class="col-lg-2 col-sm-4 col-xs-6 igs-group">
                    <h5 class="text-center">Dribbling</h5>
                    <div id="attr4-chart" class="stat-chart stat-color-5 c3 text-center">
                      <h2 class="text-center">{state.dri}</h2>
                    </div>
                    <div class="divided-row player-stat-row sm">
                      <span class="player-stat-title">Agility</span>
                      <span
                        class="player-stat-value chembot-value stat-color-5 pull-right">{state.characteristics.agility}</span>
                    </div>
                    <div class="divided-row player-stat-row sm">
                      <span class="player-stat-title">Balance</span>
                      <span
                        class="player-stat-value chembot-value stat-color-5 pull-right">{state.characteristics.balance}</span>
                    </div>
                    <div class="divided-row player-stat-row sm">
                      <span class="player-stat-title">Reactions</span>
                      <span
                        class="player-stat-value chembot-value stat-color-5 pull-right">{state.characteristics.reactions}</span>
                    </div>
                    <div class="divided-row player-stat-row sm">
                      <span class="player-stat-title">Ball Control</span>
                      <span
                        class="player-stat-value chembot-value stat-color-5 pull-right">{state.characteristics.ballControl}</span>
                    </div>
                    <div class="divided-row player-stat-row sm">
                      <span class="player-stat-title">Dribbling</span>
                      <span
                        class="player-stat-value chembot-value stat-color-5 pull-right">{state.characteristics.dribbling}</span>
                    </div>
                    <div class="divided-row player-stat-row sm">
                      <span class="player-stat-title">Composure</span>
                      <span
                        class="player-stat-value chembot-value stat-color-5 pull-right">{state.characteristics.composure}</span>
                    </div>
                  </div>
                  <div class="col-lg-2 col-sm-4 col-xs-6 igs-group">
                    <h5 class="text-center">Defending</h5>
                    <div id="attr4-chart" class="stat-chart stat-color-5 c3 text-center">
                      <h2 class="text-center">{state.def}</h2>
                    </div>
                    <div class="divided-row player-stat-row sm">
                      <span class="player-stat-title">Interceptions</span>
                      <span
                        class="player-stat-value chembot-value stat-color-5 pull-right">{state.characteristics.interceptions}</span>
                    </div>
                    <div class="divided-row player-stat-row sm">
                      <span class="player-stat-title">Heading</span>
                      <span
                        class="player-stat-value chembot-value stat-color-5 pull-right">{state.characteristics.heading}</span>
                    </div>
                    <div class="divided-row player-stat-row sm">
                      <span class="player-stat-title">Marking</span>
                      <span
                        class="player-stat-value chembot-value stat-color-5 pull-right">{state.characteristics.marking}</span>
                    </div>
                    <div class="divided-row player-stat-row sm">
                      <span class="player-stat-title">Standing Tackle</span>
                      <span
                        class="player-stat-value chembot-value stat-color-5 pull-right">{state.characteristics.standingTackle}</span>
                    </div>
                    <div class="divided-row player-stat-row sm">
                      <span class="player-stat-title">Sliding Tackle</span>
                      <span
                        class="player-stat-value chembot-value stat-color-5 pull-right">{state.characteristics.slidingTackle}</span>
                    </div>
                  </div>
                  <div class="col-lg-2 col-sm-4 col-xs-6 igs-group">
                    <h5 class="text-center">Physical</h5>
                    <div id="attr4-chart" class="stat-chart stat-color-5 c3 text-center">
                      <h2 class="text-center">{state.phy}</h2>
                    </div>
                    <div class="divided-row player-stat-row sm">
                      <span class="player-stat-title">Jumping</span>
                      <span
                        class="player-stat-value chembot-value stat-color-5 pull-right">{state.characteristics.jumping}</span>
                    </div>
                    <div class="divided-row player-stat-row sm">
                      <span class="player-stat-title">Stamina</span>
                      <span
                        class="player-stat-value chembot-value stat-color-5 pull-right">{state.characteristics.stamina}</span>
                    </div>
                    <div class="divided-row player-stat-row sm">
                      <span class="player-stat-title">Strength</span>
                      <span
                        class="player-stat-value chembot-value stat-color-5 pull-right">{state.characteristics.strength}</span>
                    </div>
                    <div class="divided-row player-stat-row sm">
                      <span class="player-stat-title">Aggression</span>
                      <span
                        class="player-stat-value chembot-value stat-color-5 pull-right">{state.characteristics.aggression}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="player-group border-rad-5 border-top-none com-add-field"
                   hidden={!this.state.isAuth}>
                <input type="text" id="comment" name="comment" class="border-rad-5 width-80 outline-none"
                       placeholder="Add a Comment"
                       ref={(input) => {
                         this.commentInput = input;
                       }}/>
                <button class="outline-none com-add-btn border-rad-5"
                        onClick={this.commentSend.bind(this)}>submit</button>
              </div>
              <div hidden={!this.state.isAuth}>
                {this.props.state[0].player.commentsPlayers.map(comment =>
                  <div class="player-group border-rad-5 border-top-none">
                    <div class="comment-header">{comment.user.login}
                      <div class="comment-body">{comment.comment}</div>
                    </div>
                  </div>
                )}
              </div>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default connect(
  state => ({
    state: state.contract,
  }),
  dispatch => ({
    onAddPlayer: (player) => {
      dispatch({ type: 'ADD_PLAYER', payload: player });
    },
  })
)(Player);
