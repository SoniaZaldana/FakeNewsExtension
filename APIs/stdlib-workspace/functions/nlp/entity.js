const nlp = require('@google-cloud/language');
const fs = require('fs');
const creds = fs.readFileSync('./gc.json');
const client = new nlp.LanguageServiceClient({
  credentials: JSON.parse(creds),
});


module.exports = async (text = 'I like apples a lot! I love Julius Ceasar and I think Aftab is pretty lame') => {
  const doc = {
  content: text,
  type: 'PLAIN_TEXT'};
  
// Detects entities in the document
const [result] = await client.analyzeEntities({document:doc});

const entities = result.entities;
return entities;

};