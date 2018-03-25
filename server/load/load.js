const http = require('http');
const Teams = require("../models").teams;

module.exports = {

    load(){
        const http = require('http');

        const options = {
            host: "34.217.13.170",
            port: 8888,
            path: "http://api.football-data.org/v1/competitions/?season=2017",
            headers: {
                Host: "api.football-data.org"
            }
        };

        http.get(options, (res) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];
            let error;
            if (statusCode !== 200) {
                error = new Error('Request Failed.\n' +
                    `Status Code: ${statusCode}`);
            } else if (!/^application\/json/.test(contentType)) {
                error = new Error('Invalid content-type.\n' +
                    `Expected application/json but received ${contentType}`);
            }
            if (error) {
                console.error(error.message);
                // consume response data to free up memory
                res.resume();
                return;
            }

            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    for (let i = 0; i < 1; i++){
                        let optionsTeam = {
                            host: "34.217.13.170",
                            port: 8888,
                            path: ('http://api.football-data.org/v1/competitions/88/teams'),
                            headers: {
                                Host: "api.football-data.org"
                            }
                        };
                        http.get(optionsTeam, (res) => {
                            res.setEncoding('utf8');
                            let rawData = '';
                            res.on('data', (chunk) => { rawData += chunk; });
                            res.on('end', () => {
                                const parsData = JSON.parse(rawData);
                                for (let j = 0; j < 1; j++){
                                    let str = parsData.teams[j]._links.players.href.substring(38);
                                    let teamID = parseInt(str);
                                    //////////////////////////////////////////////
                                    //console.log(parsedData[i].id);
                                    console.log(teamID);
                                    console.log(parsData.teams[j].name);
                                    let optionsPlayers = {
                                        host: "34.217.13.170",
                                        port: 8888,
                                        path: ('http://api.football-data.org/v1/teams/' + teamID + '/players'),
                                        headers: {
                                            Host: "api.football-data.org"
                                        }
                                    };
                                    http.get(optionsPlayers, (res) => {
                                        res.setEncoding('utf8');
                                        let rawData = '';
                                        res.on('data', (chunk) => { rawData += chunk; });
                                        res.on('end', () => {
                                            try{
                                                const pData = JSON.parse(rawData);
                                                for (let k = 0; k < pData.length; k++){
                                                    console.log("lol");
                                                    console.log(pData.players[i].name);
                                                }
                                            } catch (e){
                                                console.error(e.message);
                                            }
                                        })
                                    })
                                }
                            });
                        })
                    }
                } catch (e) {
                    console.log("lol");
                    console.error(e.message);
                }
            });
        })
    }
};