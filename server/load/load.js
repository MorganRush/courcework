const http = require('http');
const Teams = require("../models").teams;

module.exports = {

    load(){
        const http = require('http');

        http.get('http://api.football-data.org/v1/competitions/?season=2017', (res) => {
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
                    console.log("1");
                    for (let j = 0; j < parsedData.length; j++){
                        http.get(('http://api.football-data.org/v1/competitions/' + parsedData[j].id + '/teams'), (res) => {
                            res.setEncoding('utf8');
                            let rawData = '';
                            console.log("2");
                            res.on('data', (chunk) => { rawData += chunk; });
                            res.on('end', () => {
                                try {
                                    const parsData = JSON.parse(rawData);
                                    for (let i = 0; i < parsedData.length; i++){
                                        console.log(parsData.teams[i].players);
                                        console.log(parsData.teams[i].name);
                                    }
                                } catch (e) {
                                    console.error(e.message);
                                }

                            });
                        })
                    }
                } catch (e) {
                    console.error(e.message);
                }
            });
        })
    }
};