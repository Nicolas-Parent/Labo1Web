const http = require('http');
const url = require('url');

// Matière à discussion
// https://stackoverflow.com/questions/21001455/should-a-rest-api-be-case-sensitive-or-non-case-sensitive
// https://blog.restcase.com/5-basic-rest-api-design-guidelines/

module.exports = http.createServer((req, res) => {
  let mathOps = require('./controller.js');
  const reqUrl =  url.parse(req.url, true);
  // GET endpoint
  if(reqUrl.pathname == '/api/maths' && req.method === 'GET') {
    console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
    mathOps.math(req, res);
  // URL invalide
  } else {
    console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
    mathOps.invalidUrl(req, res);
  }
})