const { log } = require('console');
const fs = require('fs');
const nReadlines = require('n-readlines');
const { getUpdates, sendToApp } = require('./getUpdates');

const appUri = 'http://localhost:80/telegram';
const token = '6579656512:AAF71i9msB0zgColw9eH71143Bu4mSCrxk0';

let lastUpdateId = null;
const date = new Date();
const logFile = '/var/logs/telegram/' + date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + '.json';

fs.open(logFile, 'w', (err) => {
    if (err) throw err;
});

const readLogFile = new nReadlines(logFile, { readChunk: 2048 });
let line;
while (line = readLogFile.next()) { }
line = JSON.parse(line);
line && (lastUpdateId = line.update_id);

var requestParams = {
    hostname: 'api.telegram.org',
    port: 443,
    path: `/bot${token}/getUpdates?limit=5`,
    method: 'GET',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
};

const logger = fs.createWriteStream(logFile, { flags: 'a' });
const logLine = (message) => logger.write(JSON.stringify(message) + '\n');

/**
 * @param {object} data 
 */
const hendler = (messages) => {
    if (messages.ok) {
        messages.result.forEach(message => {
            if (message.update_id > lastUpdateId) {
                sendToApp(message, (response) => log(response));
                logLine(message);
                lastUpdateId = message.update_id;
            }
        });
    } else {
        log(messages);
    }

    setTimeout(() => getUpdates(requestParams, hendler), 500);
};

getUpdates(requestParams, hendler);