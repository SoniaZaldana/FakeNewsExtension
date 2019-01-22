const nlp = require('@google-cloud/language');
const fs = require('fs');
const creds = fs.readFileSync('./gc.json');
const client = new nlp.LanguageServiceClient({
  credentials: JSON.parse(creds),
});


module.exports = async (text = "Julius Ceasar is a fucking garbage. I love Hillary Clinton and hate Donald Trump. I think chocolate is fantastic.") => {
  const doc = {
  content: text,
  type: 'PLAIN_TEXT'};
  
return client
    .analyzeEntitySentiment({document: doc})
    .then((results) => {
      const entities = results[0].entities;
      
      return entities;
    });
    
}

