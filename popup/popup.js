function getURL(tabs) {
  let tab = tabs[0]; // Safe to assume there will only be one result
  console.log(tab.url);
  return tab.url
}

function logFakeNews(tabs) {
  console.log(" Launch Fetch");
  result = getData('https://elliot-ford.lib.id/fake-news-extension@dev/?url=https://politics.theonion.com/john-kelly-resigns-in-last-ditch-effort-to-save-his-and-1830989628');
  console.log(result);
}

function getData(url) {
  console.log("Start of getData with url:", url)

  return fetch(url)
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.log(error));
}


function onError(err){
  console.error(err);
}

chrome.tabs.query({
    active: true,
    currentWindow: true
}, logFakeNews);

