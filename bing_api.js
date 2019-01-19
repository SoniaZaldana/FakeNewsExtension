'use strict';
let https = require('https');
let subscriptionKey = 'enter key here';
let host = 'api.cognitive.microsoft.com';
let path = '/bing/v7.0/news/search';
let term = 'Microsoft';

let response_handler = function (response) {
    let body = '';
};

response.on('data', function (d) {
    body += d;
});

response.on('end', function () {
    console.log('\nRelevant Headers:\n');
    for (var header in response.headers)
        // header keys are lower-cased by Node.js
        if (header.startsWith("bingapis-") || header.startsWith("x-msedge-"))
             console.log(header + ": " + response.headers[header]);
    body = JSON.stringify(JSON.parse(body), null, '  ');
    console.log('\nJSON Response:\n');
    console.log(body);
 });
