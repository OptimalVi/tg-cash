const https = require('https');
const http = require('http');

exports.getUpdates = function (requestParams, callback) {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`Memory used: ${Math.round(used * 100) / 100} MB`);

    const req = https.request(requestParams, resp => {
        let data = '';
        resp.on('data', chunk => data += chunk);
        resp.on('end', () => callback(JSON.parse(data)));
    });

    req.on('error', err => console.log("Error: " + err.message));

    req.end();
};


exports.sendToApp = function (message, callback) {
    let postData = JSON.stringify(message);

    const req = http.request({
        hostname: 'nginx',
        port: 80,
        path: `/webhooks/telegram`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    }, resp => {
        let data = '';
        resp.on('data', chunk => data += chunk);
        resp.on('end', () => callback(JSON.parse(data)));
    });

    req.on('error', err => console.log("Error: " + err.message));
    req.write(postData);
    req.end();
};
