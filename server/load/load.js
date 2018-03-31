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
                    }
                    if (j === 100){
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

    addToDB(req, res){
        let i = 1;
        Countries
            .create({
                refNations: data[i].refNations
            })
            .then(country => {
                Teams
                    .create({
                        name: data[i].team,
                        refClubs: data[i].refClubs,
                        countryId: country.id
                    })
                    .then((team) => {
                        Players
                            .create({
                                name: data[i].name,
                                reiting: data[i].reiting,
                                pac: data[i].pac,
                                sho: data[i].sho,
                                pas: data[i].pas,
                                dri: data[i].dri,
                                def: data[i].def,
                                phy: data[i].phy,
                                refImage: data[i].refImage
                            })
                            .then((player) => {
                                Contracts
                                    .create({
                                        playerID: player.id,
                                        teamID: team.id
                                    })
                                    .then(contract => res.status(201).send(contract))
                            })
                    })
            })
            .catch((error) => res.status(400).send(error));
    }
};