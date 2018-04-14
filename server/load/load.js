const request = require("request");
const cheerio = require("cheerio");
const fs = require('fs');

const urlStart = "http://www.futhead.com/18/players/?page=";
const urlEnd = "&bin_platform=ps";
const data = require('./players');
const dataCharact = require('./characteristics');

const Players = require('../models').players;
const Contracts = require("../models").contracts;
const Teams = require("../models").teams;
const Countries = require('../models').countries;
const Characteristics = require('../models').characteristics;

module.exports = {

    loadFromFuthead() {
        const players = [];
        let count = 0;

        for (let j = 1; j <= 100; j++) {
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

                    for (let i = 0; i < 44; i++) {
                        const player = {};
                        player.name = playerNames[i].children[0].data;
                        player.reiting = playersReiting[i].children[1].children[0].data;
                        player.pac = playerStatistics[i * 10 + 0].children[0].data;
                        player.sho = playerStatistics[i * 10 + 1].children[0].data;
                        player.pas = playerStatistics[i * 10 + 2].children[0].data;
                        player.dri = playerStatistics[i * 10 + 3].children[0].data;
                        player.def = playerStatistics[i * 10 + 4].children[0].data;
                        player.phy = playerStatistics[i * 10 + 5].children[0].data;
                        player.cln = playerCLNs[i].children[2].data;
                        player.refImage = playerImages[i].attribs.src;
                        player.refClubs = playerClubs[0].attribs.src;
                        player.refNations = playerNations[0].attribs.src;
                        players.push(player);
                        count++
                    }
                    if (count === 4400) {
                        //console.log(players);
                        fs.writeFile('players.json', JSON.stringify(players), (err) => {
                            if (err) {
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

    sortJson() {
        const players = [];
        for (let i = 0; i < data.length; i++) {
            players.push(data[i]);
        }
        players.sort((player1, player2) => {
            return player2.reiting - player1.reiting
        });
        fs.writeFile('players.json', JSON.stringify(players), (err) => {
            if (err) {
                throw err;
            }
            console.log('The file has been saved!');
        });
    },

    addCountriesToDB(req, res) {
        const countries = [];
        for (let i = 0; i < data.length; i++) {
            if (find(countries, data[i].refNations) === -1) {
                countries.push(data[i].refNations);
            }
        }
        //console.log(countries);
        for (let i = 0; i < 40; i++) {
            Countries
                .create({
                    refNations: countries[i],
                })
                .then((countrie) => {
                    console.log('successes');
                    //console.log(countrie);
                })
        }
        res.status(200).send({message: 'ok'})
    },

    addTeamsToDB(req, res) {
        const teams = [];
        for (let i = 0; i < data.length; i++) {
            let isExist = false;
            for (let j = 0; j < teams.length; j++) {
                if (teams[j].name === data[i].team) {
                    isExist = true;
                }
            }
            if (!isExist) {
                let team = {};
                team.name = data[i].team;
                team.refClubs = data[i].refClubs;
                team.refNations = data[i].refNations;
                teams.push(team);
            }
        }
        for (let i = 0; i < 100; i++) {
            Countries
                .findOne({
                    where: {refNations: teams[i].refNations}
                })
                .then(country => {
                    if (country === null) {
                        console.log('lol');
                    }
                    else{
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
                    }
                })
                .catch((error) => console.log(error.message));
        }
        res.status(200).send({message: 'ok'})
    },

    addPlayersToDB(req, res) {
        const players = [];
        for (let i = 0; i < data.length; i++) {
            if (find(players, data[i].name) === -1) {
                players.push(data[i].name);
            }
        }
        //console.log(players);
        for (let i = 0; i < 1000; i++) {
            Players
                .create({
                    name: players[i],
                })
                .then(player => {
                    console.log('successes');
                })
                .catch((error) => console.log(error.message));
        }
        res.status(200).send({message: 'ok'})
    },

    addContractsAndPlayerStatisticsToDB(req, res) {
        for (let i = 0; i < 2000; i++) {
            Teams
                .findOne({
                    where: {name: data[i].team}
                })
                .then(team => {
                    if (team === null) {
                        console.log('lol');
                    }
                    else {
                        Players
                            .findOne({
                                where: {name: data[i].name}
                            })
                            .then(player => {
                                if (player === null) {
                                    console.log('lol');
                                }
                                else{
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
                                            let index = -1;
                                            for (let j = 0; j < dataCharact.length; j++){
                                                if (dataCharact[j].refImage === data[i].refImage ){
                                                    index = j;
                                                }
                                            }
                                            let indexSecond = index;
                                            if (index !== -1){
                                                if (dataCharact[index].StrongFoot !== "Right" ||
                                                    dataCharact[index].StrongFoot !== "Left"){
                                                    indexSecond = 0;
                                                }
                                                Characteristics
                                                    .create({
                                                        strongFoot: dataCharact[indexSecond].StrongFoot,
                                                        age: dataCharact[indexSecond].age,
                                                        height: dataCharact[indexSecond].height,
                                                        workrates: dataCharact[indexSecond].workrates,
                                                        acceleration: dataCharact[index].acceleration,
                                                        sprintSpeed: dataCharact[index].sprintSpeed,
                                                        positioning: dataCharact[index].positioning,
                                                        finishing: dataCharact[index].finishing,
                                                        shotPower: dataCharact[index].shotPower,
                                                        longShots: dataCharact[index].longShots,
                                                        volleys: dataCharact[index].volleys,
                                                        penalties: dataCharact[index].penalties,
                                                        vision: dataCharact[index].vision,
                                                        crossing: dataCharact[index].crossing,
                                                        freeKick: dataCharact[index].freeKick,
                                                        shortPassing: dataCharact[index].shortPassing,
                                                        longPassing: dataCharact[index].longPassing,
                                                        curve: dataCharact[index].curve,
                                                        agility: dataCharact[index].agility,
                                                        balance: dataCharact[index].balance,
                                                        reactions: dataCharact[index].reactions,
                                                        ballControl: dataCharact[index].ballControl,
                                                        dribbling: dataCharact[index].dribbling,
                                                        composure: dataCharact[index].composure,
                                                        interceptions: dataCharact[index].interceptions,
                                                        heading: dataCharact[index].heading,
                                                        marking: dataCharact[index].marking,
                                                        standingTackle: dataCharact[index].standingTackle,
                                                        slidingTackle: dataCharact[index].slidingTackle,
                                                        jumping: dataCharact[index].jumping,
                                                        stamina: dataCharact[index].stamina,
                                                        strength: dataCharact[index].strength,
                                                        aggression: dataCharact[index].aggression,
                                                        contractID: contract.id
                                                    })
                                                    .then(characteristic => {
                                                        console.log('successes');
                                                    })
                                                    .catch((error) => console.log(error.message));
                                            }
                                            else {
                                                let reiting = data[i].reiting;
                                                index = i;
                                                if (index > 99){
                                                    index = getRandomInt(0, 99);
                                                }
                                                indexSecond = index;
                                                if (dataCharact[index].StrongFoot !== "Right" ||
                                                    dataCharact[index].StrongFoot !== "Left"){
                                                    indexSecond = 0;
                                                }
                                                Characteristics
                                                    .create({
                                                        strongFoot: dataCharact[indexSecond].StrongFoot,
                                                        age: dataCharact[indexSecond].age,
                                                        height: dataCharact[indexSecond].height,
                                                        workrates: dataCharact[indexSecond].workrates,
                                                        acceleration: getRandomInt(reiting - 10, reiting + 10),
                                                        sprintSpeed: getRandomInt(reiting - 10, reiting + 10),
                                                        positioning: getRandomInt(reiting - 10, reiting + 10),
                                                        finishing: getRandomInt(reiting - 10, reiting + 10),
                                                        shotPower: getRandomInt(reiting - 10, reiting + 10),
                                                        longShots: getRandomInt(reiting - 10, reiting + 10),
                                                        volleys: getRandomInt(reiting - 10, reiting + 10),
                                                        penalties: getRandomInt(reiting - 10, reiting + 10),
                                                        vision: getRandomInt(reiting - 10, reiting + 10),
                                                        crossing: getRandomInt(reiting - 10, reiting + 10),
                                                        freeKick: getRandomInt(reiting - 10, reiting + 10),
                                                        shortPassing: getRandomInt(reiting - 10, reiting + 10),
                                                        longPassing: getRandomInt(reiting - 10, reiting + 10),
                                                        curve: getRandomInt(reiting - 10, reiting + 10),
                                                        agility: getRandomInt(reiting - 10, reiting + 10),
                                                        balance: getRandomInt(reiting - 10, reiting + 10),
                                                        reactions: getRandomInt(reiting - 10, reiting + 10),
                                                        ballControl: getRandomInt(reiting - 10, reiting + 10),
                                                        dribbling: getRandomInt(reiting - 10, reiting + 10),
                                                        composure: getRandomInt(reiting - 10, reiting + 10),
                                                        interceptions: getRandomInt(reiting - 10, reiting + 10),
                                                        heading: getRandomInt(reiting - 10, reiting + 10),
                                                        marking: getRandomInt(reiting - 10, reiting + 10),
                                                        standingTackle: getRandomInt(reiting - 10, reiting + 10),
                                                        slidingTackle: getRandomInt(reiting - 10, reiting + 10),
                                                        jumping: getRandomInt(reiting - 10, reiting + 10),
                                                        stamina: getRandomInt(reiting - 10, reiting + 10),
                                                        strength: getRandomInt(reiting - 10, reiting + 10),
                                                        aggression: getRandomInt(reiting - 10, reiting + 10),
                                                        contractID: contract.id
                                                    })
                                                    .then(characteristic => {
                                                        console.log('successes');
                                                    })
                                                    .catch((error) => console.log(error.message));
                                            }
                                        })
                                        .catch((error) => console.log(error.message));
                                }
                            })
                            .catch((error) => console.log(error.message));
                    }

                })
                .catch((error) => console.log(error.message));
        }
        res.status(200).send({message: 'ok'})
    },

    addCharacteristicsToDB(req, res){
        for (let i = 0; i < dataCharact.length; i++){
            Contracts
                .findOne({
                    where: {refImage: dataCharact[i].refImage}
                })
                .then(contract => {
                    if(contract != null){
                        Characteristics
                            .create({
                                strongFoot: dataCharact[i].StrongFoot,
                                age: dataCharact[i].age,
                                height: dataCharact[i].height,
                                workrates: dataCharact[i].workrates,
                                acceleration: dataCharact[i].acceleration,
                                sprintSpeed: dataCharact[i].sprintSpeed,
                                positioning: dataCharact[i].positioning,
                                finishing: dataCharact[i].finishing,
                                shotPower: dataCharact[i].shotPower,
                                longShots: dataCharact[i].longShots,
                                volleys: dataCharact[i].volleys,
                                penalties: dataCharact[i].penalties,
                                vision: dataCharact[i].vision,
                                crossing: dataCharact[i].crossing,
                                freeKick: dataCharact[i].freeKick,
                                shortPassing: dataCharact[i].shortPassing,
                                longPassing: dataCharact[i].longPassing,
                                curve: dataCharact[i].curve,
                                agility: dataCharact[i].agility,
                                balance: dataCharact[i].balance,
                                reactions: dataCharact[i].reactions,
                                ballControl: dataCharact[i].ballControl,
                                dribbling: dataCharact[i].dribbling,
                                composure: dataCharact[i].composure,
                                interceptions: dataCharact[i].interceptions,
                                heading: dataCharact[i].heading,
                                marking: dataCharact[i].marking,
                                standingTackle: dataCharact[i].standingTackle,
                                slidingTackle: dataCharact[i].slidingTackle,
                                jumping: dataCharact[i].jumping,
                                stamina: dataCharact[i].stamina,
                                strength: dataCharact[i].strength,
                                aggression: dataCharact[i].aggression,
                                contractID: contract.id
                            })
                            .then(characteristic => {
                                console.log('successes');
                            })
                            .catch((error) => console.log(error.message));
                    }
                })
                .catch((error) => console.log(error.message));
        }
        res.status(200).send({message: 'ok'})
    },

    addToDB(req, res) {
        for (let i = 0; i < data.length; i++) {
            Countries
                .findOne({
                    where: {refNations: data[i].refNations}
                })
                .then(country => {
                    console.log(country);
                    if (country === null) {
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
                            where: {name: data[i].team}
                        })
                        .then(team => {
                            if (team === null) {
                                Teams
                                    .create({
                                        name: data[i].team,
                                        refClubs: data[i].refClubs,
                                        countryId: country.id
                                    })
                                    .then(newTeam => {
                                        team = newTeam;
                                    })
                                    .catch((error) => console.log(error.message));
                            }
                            Players
                                .findOne({
                                    where: {name: data[i].name}
                                })
                                .then(player => {
                                    if (player === null) {
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

function find(array, value) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
            return i;
        }
    }
    return -1;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
