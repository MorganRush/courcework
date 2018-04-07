const request = require("request");
const cheerio = require("cheerio");
const fs = require('fs');

const urlStart = "http://www.futhead.com/18/players/?page=";
const urlEnd = "&bin_platform=ps";
const data = require('./players');

const Players = require('../models').players;
const Contracts = require("../models").contracts;
const Teams = require("../models").teams;
const Cities = require('../models').cities;
const Countries = require('../models').countries;

module.exports = {

    loadFromFuthead(){
        const players = [];
        let count = 0;

        for (let j = 1; j <= 100; j++){
            request((urlStart + j + urlEnd), function (error, response, body) {
                if (!error) {
                    const $ = cheerio.load(body);
                    const playerNames = $('.player-name');
                    const playerStatistics = $('.value');
                    const playersReiting = $('.player-rating.stream-col-50.text-center');
                    const playerCLNs = $('.player-club-league-name');
                    const playerImages = $('.player-image');
                    const playerClubs = $('.player-club');
                    const playerNations = $('.player-nation');

                    for (let i = 0; i < 44; i++){
                        const player = {};
                        player.name = playerNames[i].children[0].data;
                        player.reiting = playersReiting[i].children[1].children[0].data;
                        player.pac = playerStatistics[i*10 + 0].children[0].data;
                        player.sho = playerStatistics[i*10 + 1].children[0].data;
                        player.pas = playerStatistics[i*10 + 2].children[0].data;
                        player.dri = playerStatistics[i*10 + 3].children[0].data;
                        player.def = playerStatistics[i*10 + 4].children[0].data;
                        player.phy = playerStatistics[i*10 + 5].children[0].data;
                        player.cln = playerCLNs[i].children[2].data;
                        player.refImage = playerImages[i].attribs.src;
                        player.refClubs = playerClubs[0].attribs.src;
                        player.refNations = playerNations[0].attribs.src;
                        players.push(player);
                        count++
                    }
                    if (count === 4400){
                        //console.log(players);
                        fs.writeFile('players.json', JSON.stringify(players), (err) => {
                            if (err){
                                throw err;
                            }
                            console.log('The file has been saved!');
                        });
                    }
                } else {
                    console.log("Произошла ошибка: " + error);
                }
            });
        }
    },

    sortJson(){
        const players = [];
        for(let i = 0; i < data.length; i++){
            players.push(data[i]);
        }
        players.sort((player1, player2) => { return player2.reiting - player1.reiting });
        fs.writeFile('players.json', JSON.stringify(players), (err) => {
            if (err){
                throw err;
            }
            console.log('The file has been saved!');
        });
    },

    addCountriesToDB(req, res){
        const countries = [];
        for(let i = 0; i < data.length; i++){
            if (find(countries, data[i].refNations) === -1){
                countries.push(data[i].refNations);
            }
        }
        //console.log(countries);
        for(let i = 0; i < countries.length; i++){
            Countries
                .create({
                    refNations: countries[i],
                })
                .then((countrie) => {
                    console.log('successes');
                    //console.log(countrie);
                })
        }
        res.status(200).send({ message: 'ok' })
    },

    addTeamsToDB(req, res){
        const teams = [];
        for (let i = 0; i < data.length; i++){
            let isExist = false;
            for (let j = 0; j < teams.length; j++){
                if(teams[j].name === data[i].team){
                    isExist = true;
                }
            }
            if (!isExist){
                let team = {};
                team.name = data[i].team;
                team.refClubs = data[i].refClubs;
                team.refNations = data[i].refNations;
                teams.push(team);
            }
        }
        for(let i = 0; i < teams.length; i++){
            Countries
                .findOne({
                    where: { refNations: teams[i].refNations }
                })
                .then(country => {
                    if (country === null){
                        console.log('lol');
                    }
                    Teams
                        .create({
                            name: teams[i].name,
                            refClubs: teams[i].refClubs,
                            countryId: country.id,
                        })
                        .then((team) => {
                            console.log('successes');
                        })
                        .catch((error) => console.log(error.message));
                })
                .catch((error) => console.log(error.message));
        }
        res.status(200).send({ message: 'ok' })
    },

    addPlayersToDB(req, res) {
        const players = [];
        for (let i = 0; i < data.length; i++) {
            if (find(players, data[i].name) === -1) {
                players.push(data[i].name);
            }
        }
        //console.log(players);
        for (let i = 0; i < players.length; i++){
            Players
                .create({
                    name: players[i],
                })
                .then(player => {
                    console.log('successes');
                })
                .catch((error) => console.log(error.message));
        }
        res.status(200).send({ message: 'ok' })
    },

    addContractsAndPlayerStatistiscToDB(req, res){
        for (let i = 0; i < data.length; i++){
            Teams
                .findOne({
                    where: { name: data[i].team }
                })
                .then(team => {
                    if (team === null){
                        console.log('lol');
                    }
                    Players
                        .findOne({
                            where: { name: data[i].name }
                        })
                        .then(player => {
                            if (player === null){
                                console.log('lol');
                            }
                            Contracts
                                .create({
                                    reiting: data[i].reiting,
                                    pac: data[i].pac,
                                    sho: data[i].sho,
                                    pas: data[i].pas,
                                    dri: data[i].dri,
                                    def: data[i].def,
                                    phy: data[i].phy,
                                    refImage: data[i].refImage,
                                    playerID: player.id,
                                    teamID: team.id,
                                })
                                .then(contract => {
                                    console.log('successes');
                                })
                                .catch((error) => console.log(error.message));
                        })
                        .catch((error) => console.log(error.message));
                })
                .catch((error) => console.log(error.message));
        }
        res.status(200).send({ message: 'ok' })
    },

    addToDB(req, res){
        for(let i = 0; i < data.length; i++){
            Countries
                .findOne({
                    where: { refNations: data[i].refNations }
                })
                .then(country => {
                    console.log(country);
                    if (country === null){
                        Countries
                            .create({
                                refNations: data[i].refNations
                            })
                            .then(newCountry => {
                                country = newCountry;
                            })
                            .catch((error) => console.log(error.message));
                    }
                    Teams
                        .findOne({
                            where: { name: data[i].team }
                        })
                        .then(team => {
                            if(team === null){
                                Teams
                                    .create({
                                        name: data[i].team,
                                        refClubs: data[i].refClubs,
                                        countryId: country.id
                                    })
                                    .then(newTeam =>{
                                        team = newTeam;
                                    })
                                    .catch((error) => console.log(error.message));
                            }
                            Players
                                .findOne({
                                    where: { name: data[i].name }
                                })
                                .then(player =>{
                                    if (player === null){
                                        Players
                                            .create({
                                                name: data[i].name,
                                            })
                                            .then(newPlayer => {
                                                player = newPlayer;
                                            })
                                            .catch((error) => console.log(error.message));
                                    }
                                    PlayersStatistics
                                        .create({
                                            reiting: data[i].reiting,
                                            pac: data[i].pac,
                                            sho: data[i].sho,
                                            pas: data[i].pas,
                                            dri: data[i].dri,
                                            def: data[i].def,
                                            phy: data[i].phy,
                                            refImage: data[i].refImage,
                                        })
                                        .then(playerStatistics => {
                                            Contracts
                                                .create({
                                                    playerID: player.id,
                                                    teamID: team.id,
                                                    playersStatisticsID: playerStatistics.id,
                                                })
                                                .then(console.log("successes"))
                                                .catch((error) => console.log(error.message));
                                        })
                                        .catch((error) => console.log(error.message));
                                })
                        })
                        .catch((error) => console.log(error.message));
                })
                .catch((error) => console.log(error.message));
        }
    }
};

function find(array, value){
    for (let i = 0; i < array.length; i++){
        if (array[i] === value){
            return i;
        }
    }
    return -1;
}
