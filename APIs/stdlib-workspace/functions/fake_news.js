/**
* Summarize Bot Test
* @param {string} url 
* @returns {any}
*/

let request = require('request');

module.exports = async (url = '', context) => {
  let key = '';
  let params = `&size=20&keywords=10&fragments=15&url=${url}`;
  let endpoint = `https://www.summarizebot.com/api/checkfake?apiKey=${key}${params}`;
 
  var options = { 
    url: endpoint,
  };  
  
  return await new Promise((resolve, reject) => {
    return request(options, function(err, response, body) {
      if (err) {
        return reject(err);
      } else {
        return resolve(JSON.parse(body));
      }   
    }); 
  }); 
};
