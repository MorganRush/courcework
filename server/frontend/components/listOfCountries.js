import React, {Component} from 'react';
import Img from 'react-image';
import {connect} from 'react-redux';
import './css/listOfCountries.css';
import Head from './part/head';
import $ from "jquery";
import ScrollEvent from 'react-onscroll';
import { Link } from 'react-router';

const urlOnDataLoad = "main/countries/";
const urlOnFind = "/main/countries/like/";
const urlOnUserName = "/main/user/";

class ListOfCountries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            limit: 10,
            isAuth: false,
            login: '',
        };
        this.loadName = this.loadName.bind(this);
        this.handleScrollCallback = this.handleScrollCallback.bind(this);
        this.findCountries = this.findCountries.bind(this);
    }

    componentDidMount() {
        this.loadName();
        this.addCountries();
    };

    handleScrollCallback() {
        const scroll_height = $(document).height();
        const scroll_position = $(window).height() + $(window).scrollTop();
        if (scroll_position === scroll_height) {
            if (this.findInput.value === "" || this.findInput.value === null) {
                this.addCountries();
            }
            else {
                this.findCountries();
            }
        }
    }

    inputChange() {
        this.state.offset = 0;
        this.props.onDeleteCountries();
        if (this.findInput.value === "" || this.findInput.value === null) {
            this.addCountries();
        }
        else {
            this.findCountries();
        }
    }

    addCountries() {
        $.ajax({
            url: (urlOnDataLoad + this.state.limit + '/' + this.state.offset),
            dataType: 'json',
            cache: false,
            success: function (data) {
                data.forEach((team) => {
                    this.props.onAddCountries(team);
                });
                this.state.offset++;
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(urlOnDataLoad, status, err.toString());
            }
        });
    }

    findCountries() {
        $.ajax({
            url: (urlOnFind + this.state.limit + '/' + this.state.offset + '/' + this.findInput.value),
            dataType: 'json',
            cache: false,
            success: function (data) {
                if (this.findInput.value === "" || this.findInput.value === null) {
                    return;
                }
                data.forEach((team) => {
                    this.props.onAddCountries(team);
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
        console.log(this.props.store);
        return (
            <div className="ListOfCountries">
                <ScrollEvent handleScrollCallback={this.handleScrollCallback}/>
                <Head login = {this.state.login} isAuth={this.state.isAuth}/>
                <div class="content-header">
                    <div class="content-header-left slash futhead">
                        <h1 class="player-list-header">
                            <small>FIFA 18 DATABASE</small>

                            NATIONS

                            <small>ALL THE BIGGEST FIFA 18 NATIONS</small>
                        </h1>
                    </div>
                </div>
                <div class="content-table">
                    <ul class="list-group">
                        <li hidden={true} class="advansed-search padding-0">
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
                            <div class="county-item">
                                <span class="stream-col-80"></span>
                                <span hidden={true} class="stream-col-60">Name</span>
                            </div>
                        </li>
                        {this.props.countries.map((country) =>
                            <li key={country.id.toString()}>
                                <div class="country-item">
                                    <Link to={"/players/country/" + country.id} class="display-block padding-0">
                                        <Img class="country-image" src={country.refNations}/>
                                        <span class="country-info">
                                        <span class="country-name">{country.name}</span>
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
        countries: state.countries
    }),
    dispatch => ({
        onAddCountries: (countries) => {
            dispatch({type: 'ADD_COUNTRIES', payload: countries});
        },
        onDeleteCountries: () => {
            dispatch({type: 'DELETE_COUNTRIES'});
        }
    })
)(ListOfCountries);
