import React, { Component } from 'react';
import Img from 'react-image';
import { connect } from 'react-redux';
import './css/listOfTeams.css';
import Head from './part/head';
import $ from "jquery";
import ScrollEvent from 'react-onscroll';
import { Link } from 'react-router';

const urlOnDataLoad = "/main/teams/";
const urlOnFind = "/main/teams/like/";
const urlOnUserName = "/main/user/";

class ListOfTeams extends Component{
    constructor(props){
        super(props);
        this.state = {
            offset: 0,
            limit: 10,
            isAuth: false,
            login: '',
        };
        this.loadName = this.loadName.bind(this);
        this.handleScrollCallback = this.handleScrollCallback.bind(this);
        this.findTeams = this.findTeams.bind(this);
    }

    componentDidMount() {
        this.loadName();
        this.addTeams();
    };

    handleScrollCallback() {
        const scroll_height = $(document).height();
        const scroll_position = $(window).height() + $(window).scrollTop();
        if (scroll_position === scroll_height) {
            if (this.findInput.value === "" || this.findInput.value === null) {
                this.addTeams();
            }
            else {
                this.findTeams();
            }
        }
    }

    inputChange() {
        this.state.offset = 0;
        this.props.onDeleteTeams();
        if (this.findInput.value === "" || this.findInput.value === null) {
            this.addTeams();
        }
        else {
            this.findTeams();
        }
    }

    addTeams() {
        $.ajax({
            url: (urlOnDataLoad + this.state.limit + '/' + this.state.offset),
            dataType: 'json',
            cache: false,
            success: function (data) {
                data.forEach((team) => {
                    this.props.onAddTeams(team);
                });
                this.state.offset++;
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(urlOnDataLoad, status, err.toString());
            }
        });
    }

    findTeams() {
        $.ajax({
            url: (urlOnFind + this.state.limit + '/' + this.state.offset + '/' + this.findInput.value),
            dataType: 'json',
            cache: false,
            success: function (data) {
                if (this.findInput.value === "" || this.findInput.value === null) {
                    return;
                }
                data.forEach((team) => {
                    this.props.onAddTeams(team);
                });
                this.state.offset++;
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(urlOnFind, status, err.toString());
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
                if (data.login != null){
                    this.state.isAuth = true;
                    this.state.login = data.login;
                }
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(urlOnUserName, status, err.toString());
            }
        });
    }

    render() {
        return (
            <div className="ListOfTeams">
                <ScrollEvent handleScrollCallback={this.handleScrollCallback}/>
                <Head login = {this.state.login} isAuth={this.state.isAuth}/>
                <div class="content-header">
                    <div class="content-header-left slash futhead">
                        <h1 class="player-list-header">
                            <small>FIFA 18 DATABASE</small>

                            CLUBS

                            <small>ALL THE BIGGEST FIFA 18 CLUBS</small>
                        </h1>
                    </div>
                </div>
                <div class="content-table">
                <ul class="list-group">
                    <li class="advansed-search padding-0">
                        <div class="row obscure padding-15">
                            <div class="col-md-10">
                                <input class="filter form-control" type="text" placeholder="Filter By Name"
                                       ref={(input) => {
                                           this.findInput = input
                                       }}
                                       onChange={this.inputChange.bind(this)}/>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="team-item">
                            <span class="stream-col-80"></span>
                            <span class="stream-col-60">Name</span>
                        </div>
                    </li>
                    {this.props.teams.map((team) =>
                        <li key={team.id.toString()}>
                            <div class="team-item">
                                <Link to={'/players/team/' + team.id} class="display-block padding-0">
                                    <Img class="team-image" src={team.refClubs}/>
                                    <span class="team-info">
                                        <span class="team-name">{ team.name }</span>
                                    </span>
                                </Link>
                            </div>
                        </li>
                    )}
                </ul>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        teams: state.teams
    }),
    dispatch => ({
        onAddTeams: (teams) => {
            dispatch({type: 'ADD_TEAM', payload: teams});
        },
        onDeleteTeams: () => {
            dispatch({type: 'DELETE_TEAM'});
        }
    })
)(ListOfTeams);
