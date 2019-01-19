function getURL(tabs) {
  let tab = tabs[0]; // Safe to assume there will only be one result
  console.log(tab.url);
  return tab.url
}

function logFakeNews(tabs) {
  console.log("Head of logFakeNews");
  result = getData('https://www.summarizebot.com/api/checkfake?apiKey=7bc4b0c77ace418290dc797690f87425&size=20&keywords=10&fragments=15&url=https://politics.theonion.com/john-kelly-resigns-in-last-ditch-effort-to-save-his-and-1830989628')
  //result = getData('https://example.com')
  console.log("Tail of logFakeNews");
  console.log(result);
}

function getData(url) {
  console.log("Start of getData with url:", url)

  return fetch(url).then(response => console.log(response));
}


function onError(err){
  console.error(err);
}

browser.tabs.query({currentWindow: true, active: true}).then(logFakeNews, onError);
