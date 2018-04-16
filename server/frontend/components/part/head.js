import React, { Component } from 'react';
import '../css/App.css';
import '../css/head.css'
import { Link } from 'react-router';
import $ from "jquery";

const urlOnUserName = "/main/user/";

class Head extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: props.isAuth,
      login: props.login,
    };
    this.loadName = this.loadName.bind(this);
  }

  componentDidMount() {
    this.loadName();
  }

  loadName() {
    $.ajax({
      url: (urlOnUserName),
      dataType: 'json',
      cache: false,
      success: function (data) {
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

  render() {
    const isAuth = this.state.isAuth;
    const login = this.state.login;

    return (
      <div className="App">
        {/*<head>*/}
          {/*<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>*/}
          {/*<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>*/}
        {/*</head>*/}
        {/*<nav class="navbar navbar-futhead navbar-fixed-top app-navbar">*/}
          {/*<div class="container">*/}
            {/*<div class="navbar-header">*/}
              {/*<a href="javascript:;" class="navbar-toggle mobile-navbar-toggle">*/}
                {/*<i class="material-icons font-32 white">menu</i>*/}
              {/*</a>*/}
            {/*</div>*/}
            {/*<div class="navbar-collapse collapse" id="navbar-collapse-main">*/}
              {/*<ul class="nav navbar-nav hidden-sm hidden-xs">*/}
                {/*<li class="dropdown dropdown-hover with-fade only-text search-hide">*/}
                  {/*/!*<Link class="dropdown-toggle disabled" data-toggle="dropdown" to="/players">Players</Link>*!/*/}
                  {/*<Link class="dropdown-toggle disabled" data-toggle="dropdown" to="/">Home</Link>*/}
                {/*</li>*/}
                {/*<li class="dropdown dropdown-hover with-fade only-text search-hide">*/}
                  {/*/!*<Link class="dropdown-toggle disabled" data-toggle="dropdown" to="/players">Players</Link>*!/*/}
                  {/*<a class="dropdown-toggle disabled" data-toggle="dropdown" href="/players">Players</a>*/}
                {/*</li>*/}
                {/*<li class="dropdown dropdown-hover with-fade only-text search-hide">*/}
                  {/*/!*<Link class="dropdown-toggle disabled" data-toggle="dropdown" to="/players">Players</Link>*!/*/}
                  {/*<Link class="dropdown-toggle disabled" data-toggle="dropdown" to="/countries">Nations</Link>*/}
                {/*</li>*/}
                {/*<li class="dropdown dropdown-hover with-fade only-text search-hide">*/}
                  {/*/!*<Link class="dropdown-toggle disabled" data-toggle="dropdown" to="/players">Players</Link>*!/*/}
                  {/*<Link class="dropdown-toggle disabled" data-toggle="dropdown" to="/teams">Clubs</Link>*/}
                {/*</li>*/}
              {/*</ul>*/}
              {/*<ul class="nav navbar-nav navbar-right navbar-personal hidden-sm hidden-xs search-hide"*/}
                  {/*hidden={isAuth}>*/}
                {/*<li class="with-fade only-text">*/}
                  {/*<a href="/signin">Sign in</a>*/}
                {/*</li>*/}
                {/*<li class="with-fade only-text"><a class="text-gray">or</a></li>*/}
                {/*<li class="with-fade only-text">*/}
                  {/*<a href="/signup">Sign up</a>*/}
                {/*</li>*/}
              {/*</ul>*/}
              {/*<ul class="nav navbar-nav navbar-right navbar-personal hidden-sm hidden-xs search-hide"*/}
                  {/*hidden={!isAuth}>*/}
                {/*<li class="with-fade only-text">*/}
                  {/*<Link to="/favorite">Favorites</Link>*/}
                {/*</li>*/}
                {/*<li class="with-fade only-text">*/}
                  {/*<div>{login}</div>*/}
                {/*</li>*/}
              {/*</ul>*/}
            {/*</div>*/}
          {/*</div>*/}
        {/*</nav>*/}
        <head>
          <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
          {/*<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css"/>*/}
          <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'/>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js"/>
        </head>
        <nav class="navbar navbar-futhead navbar-fixed-top app-navbar" >
          <input  type="checkbox" id="nav" class="hidden"/>
          <label  for="nav" class="nav-open"><i></i><i></i><i></i></label>
          <div class="nav-container">
            {/*<ul>*/}
            {/*<ul class="nav navbar-nav ">*/}
            {/*<li class="dropdown dropdown-hover with-fade only-text search-hide">*/}
            {/*<a class="dropdown-toggle disabled" data-toggle="dropdown" href="/">Home</a>*/}
            {/*</li>*/}
            {/*<li class="dropdown dropdown-hover with-fade only-text search-hide">*/}
            {/*<a class="dropdown-toggle disabled" data-toggle="dropdown" href="/players">Players</a>*/}
            {/*</li>*/}
            {/*<li class="dropdown dropdown-hover with-fade only-text search-hide">*/}
            {/*<a class="dropdown-toggle disabled" data-toggle="dropdown" href="/countries">Nations</a>*/}
            {/*</li>*/}
            {/*<li class="dropdown dropdown-hover with-fade only-text search-hide">*/}
            {/*<a class="dropdown-toggle disabled" data-toggle="dropdown" href="/teams">Clubs</a>*/}
            {/*</li>*/}
            {/*</ul>*/}
            {/*<ul class="nav navbar-nav navbar-right navbar-personal" hidden={this.state.isAuth}>*/}
            {/*<li class="with-fade only-text">*/}
            {/*<a href="">Sign in</a>*/}
            {/*</li>*/}
            {/*<li class="with-fade only-text nav-or"><a class="text-gray">or</a></li>*/}
            {/*<li class="with-fade only-text">*/}
            {/*<a href="">Sign up</a>*/}
            {/*</li>*/}
            {/*</ul>*/}
            {/*<ul class="nav navbar-nav navbar-right navbar-personal" hidden={!this.state.isAuth}>*/}
            {/*<li class="with-fade only-text">*/}
            {/*<a href="">Favorites</a>*/}
            {/*</li>*/}
            {/*<li class="with-fade only-text">*/}
            {/*<div>{this.state.login}</div>*/}
            {/*</li>*/}
            {/*</ul>*/}
            {/*</ul>*/}
            <ul>
              <li><Link class="text-white" to="/">Home</Link></li>
              <li><Link class="text-white" to="/players">Players</Link></li>
              <li><Link class="text-white" to="/countries">Nations</Link></li>
              <li><Link class="text-white" to="/teams">Clubs</Link></li>
              <li class="margin-right-25 float-right" hidden={this.state.isAuth}><a class="text-white" href="/signup" hidden={this.state.isAuth}>Sign up</a></li>
              <li class="float-right" hidden={this.state.isAuth}><a class="text-white" href="/signin" hidden={this.state.isAuth}>Sign in</a></li>

              <li class="margin-right-25 float-right" hidden={!this.state.isAuth}><div class="text-white" hidden={!this.state.isAuth}>{this.state.login}</div></li>
              <li class="float-right" hidden={!this.state.isAuth}><Link class="text-white" to="/favorite" hidden={!this.state.isAuth}>Favorites</Link></li>
            </ul>
          </div>
        </nav>
        <div class="br"/>
      </div>
    );
  }
}

export default (Head);
