/**
* A simple "hello world" function
*/
let request = require('request');

module.exports = async (title = '') => {

  let endpoint = `https://api.cognitive.microsoft.com/bing/v7.0/news/search?&q=${title}&count=10`;
  let headers = {"Ocp-Apim-Subscription-Key":''}
 
  var options = { 
    url: endpoint,
    headers: headers,
  };  
  
  return await new Promise((resolve, reject) => {
    return request(options, function(err, response, body) {
      if (err) {
        return reject(err);
      } else {
        return resolve(JSON.parse(body))
        // return resolve(output.values()
        
      }   
    }); 
  }); 
};
