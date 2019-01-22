let request = require('request');

module.exports = async (url = 'https://politics.theonion.com/john-kelly-resigns-in-last-ditch-effort-to-save-his-and-1830989628', context) => {
  let key = '';
  let params = `&size=20&keywords=10&fragments=15&url=${url}`;
  let endpoint = `https://www.summarizebot.com/api/summarize?apiKey=${key}${params}`;
 
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
