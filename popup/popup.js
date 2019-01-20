let api_url = `https://elliot-ford.lib.id/fake-news-extension@dev/`
let accuracy_api = `fake_news/?url=`

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

function getAccuracy(url) {
  console.log("Getting Accuracy....");
  fetch("https://elliot-ford.lib.id/fake-news-extension@dev/fake_news/?url=".concat(url))
    .then(response => response.json())
    .then(json => updateRealGauge(json.predictions[0].confidence))
    .catch(error => console.log(error));
}

function getData(url) {
  console.log("Start of getData with url:", url)

  return fetch(url)
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.log(error));
}

// Gauges

var lrgauge = function(container, configuration) {
  console.log(container)
  var that = {};
  var config = {
    size                      : 200,
    clipWidth                 : 200,
    clipHeight                : 110,
    ringInset                 : 20,
    ringWidth                 : 20,

    pointerWidth              : 10,
    pointerTailLength         : 5,
    pointerHeadLengthPercent  : 0.9,

    minValue                  : -10,
    maxValue                  : 10,

    minAngle                  : -90,
    maxAngle                  : 90,

    transitionMs              : 750,

    majorTicks                : 1,
    labelFormat               : d3.format(',g'),
    labelInset                : 10,

    arcColorFn                : d3.interpolateHsl(d3.rgb('#0000ff'), d3.rgb('#ff0000')),
  };
  var range = undefined;
  var r = undefined;
  var pointerHeadLength = undefined;
  var value = 0;

  var svg = undefined;
  var arc = undefined;
  var scale = undefined;
  var ticks = undefined;
  var tickData = undefined;
  var pointer = undefined;

  var donut = d3.layout.pie();

  function deg2rad(deg) {
    return deg * Math.PI / 180;
  }

  function newAngle(d) {
    var ratio = scale(d);
    var newAngle = config.minAngle + (ratio * range);
    return newAngle;
  }

  function configure(configuration) {
    var prop = undefined;
    for ( prop in configuration ) {
      config[prop] = configuration[prop];
    }

    range = config.maxAngle - config.minAngle;
    r = config.size / 2;
    pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);

    // a linear scale that maps domain values to a percet from 0..1
    scale = d3.scale.linear()
      .range([0,1])
      .domain([config.minValue, config.maxValue]);

    ticks = scale.ticks(config.majorTicks);
    tickData = d3.range(config.majorTicks).map(function() {return 1/config.majorTicks;});

    arc = d3.svg.arc()
      .innerRadius(r - config.ringWidth - config.ringInset)
      .outerRadius(r - config.ringInset)
      .startAngle(function(d, i) {
        var ratio = d * i;
        return deg2rad(config.minAngle + (ratio * range));
      })
      .endAngle(function(d, i) {
        var ratio = d * (i+1);
        return deg2rad(config.minAngle + (ratio * range));
      });
  }
  that.configure = configure;

  function centerTranslation() {
    return 'translate('+ config.clipWidth / 2 + ',' + config.clipHeight / 2 + ')';
  }

  function isRendered() {
    return (svg !== undefined);
  }
  that.isRendered = isRendered;

  function render(newValue) {
    svg = d3.select(container)
      .append('svg:svg')
      .attr('class', 'lrgauge')
      .attr('width', config.clipWidth)
      .attr('height', config.clipHeight);

    var centerTx = centerTranslation();

    svg.append('defs')
      .append('linearGradient')
        .attr('id','lrGradient');

    svg.select('defs')
      .select('linearGradient')
      .append('stop')
        .attr('offset','5%')
        .attr('stop-color', '#0000FF')

    svg.select('defs')
      .select('linearGradient')
      .append('stop')
        .attr('offset','95%')
        .attr('stop-color', '#FF0000')



    var arcs = svg.append('g')
      .attr('class', 'arc')
      .attr('transform', centerTx);

    arcs.selectAll('path')
      .data(tickData)
      .enter().append('path')
      .attr('fill', 'url(#lrGradient)')
      .attr('d', arc);

    var lg = svg.append('g')
      .attr('class', 'label')
      .attr('transform', centerTx);
    lg.append('text').attr('transform', 'rotate(-90) translate(0,-56) rotate(90)').text('Left');
    lg.append('text').attr('transform', 'rotate(90) translate(0,-32) rotate(-90)').text('Right');
    lg.append('text').attr('transform', 'translate(0,-32)').attr('text-anchor','middle').text('Center');
    lg.append('text').attr('transform', 'translate(0,-45)').attr('text-anchor','middle').text('Article Bias');
    value = lg.append('text').attr('transform', 'translate(0,20)').attr('text-anchor','middle').text(0);

    var lineData = [ [config.pointerWidth / 2, 0],
      [0, -pointerHeadLength],
      [-(config.pointerWidth / 2), 0],
      [0, config.pointerTailLength],
      [config.pointerWidth / 2, 0] ];
    var pointerLine = d3.svg.line().interpolate('monotone');
    var pg = svg.append('g').data([lineData])
      .attr('class', 'pointer')
      .attr('transform', centerTx);

    pointer = pg.append('path')
      .attr('d', pointerLine/*function(d) { return pointerLine(d) + 'Z';}*/ )
      .attr('transform', 'rotate(' + config.minAngle + ')');

    update(newValue === undefined ? 0 : newValue);
  }
  that.render = render;

  function update(newValue, newConfiguration) {
    if ( newConfiguration !== undefined) {
      configure(newConfiguration);
    }
    var ratio = scale(newValue);
    var newAngle = config.minAngle + (ratio * range);
    pointer.transition()
      .duration(config.transitionMs)
      .ease('elastic')
      .attr('transform', 'rotate(' + newAngle + ')');
    value.text((Math.abs(newValue) * 100).toFixed(2));
  }
  that.update = update
  configure(configuration);

  return that;
}


var real_gauge = function(container, configuration) {
  var that = {};
  var config = {
    size                      : 400,
    clipWidth                 : 200,
    clipHeight                : 110,
    ringInset                 : 20,
    ringWidth                 : 20,

    pointerWidth              : 10,
    pointerTailLength         : 5,
    pointerHeadLengthPercent  : 0.9,

    minValue                  : -10,
    maxValue                  : 10,

    minAngle                  : -90,
    maxAngle                  : 90,

    transitionMs              : 750,

    majorTicks                : 1,
    labelFormat               : d3.format(',g'),
    labelInset                : 10,

    arcColorFn                : d3.interpolateHsl(d3.rgb('#0000ff'), d3.rgb('#ff0000')),
  };
  var range = undefined;
  var r = undefined;
  var pointerHeadLength = undefined;
  var value = 0;

  var svg = undefined;
  var arc = undefined;
  var scale = undefined;
  var ticks = undefined;
  var tickData = undefined;
  var pointer = undefined;

  var donut = d3.layout.pie();

  function deg2rad(deg) {
    return deg * Math.PI / 180;
  }

  function newAngle(d) {
    var ratio = scale(d);
    var newAngle = config.minAngle + (ratio * range);
    return newAngle;
  }

  function configure(configuration) {
    var prop = undefined;
    for ( prop in configuration ) {
      config[prop] = configuration[prop];
    }

    range = config.maxAngle - config.minAngle;
    r = config.size / 2;
    pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);

    // a linear scale that maps domain values to a percet from 0..1
    scale = d3.scale.linear()
      .range([0,1])
      .domain([config.minValue, config.maxValue]);

    ticks = scale.ticks(config.majorTicks);
    tickData = d3.range(config.majorTicks).map(function() {return 1/config.majorTicks;});

    arc = d3.svg.arc()
      .innerRadius(r - config.ringWidth - config.ringInset)
      .outerRadius(r - config.ringInset)
      .startAngle(function(d, i) {
        var ratio = d * i;
        return deg2rad(config.minAngle + (ratio * range));
      })
      .endAngle(function(d, i) {
        var ratio = d * (i+1);
        return deg2rad(config.minAngle + (ratio * range));
      });
  }
  that.configure = configure;

  function centerTranslation() {
    return 'translate('+ config.clipWidth / 2 + ',' + config.clipHeight / 2 + ')';
  }

  function isRendered() {
    return (svg !== undefined);
  }
  that.isRendered = isRendered;

  function render(newValue) {
    svg = d3.select(container)
      .append('svg:svg')
      .attr('class', 'gauge')
      .attr('width', config.clipWidth)
      .attr('height', config.clipHeight);

    var centerTx = centerTranslation();

    svg.append('defs')
      .append('linearGradient')
        .attr('id','realGradient');

    svg.select('defs')
      .select('linearGradient')
      .append('stop')
        .attr('offset','5%')
        .attr('stop-color', '#000000')

    svg.select('defs')
      .select('linearGradient')
      .append('stop')
        .attr('offset','95%')
        .attr('stop-color', '#00FF00')



    var arcs = svg.append('g')
      .attr('class', 'arc')
      .attr('transform', centerTx);

    arcs.selectAll('path')
      .data(tickData)
      .enter().append('path')
      .attr('fill', 'url(#realGradient)')
      .attr('d', arc);

    var lg = svg.append('g')
      .attr('class', 'label')
      .attr('transform', centerTx);
    lg.append('text').attr('transform', 'rotate(-90) translate(0,-56) rotate(90)').text('Fake');
    lg.append('text').attr('transform', 'rotate(90) translate(0,-32) rotate(-90)').text('Real');
    lg.append('text').attr('transform', 'translate(0,-45)').attr('text-anchor','middle').text('Article Accuracy');
    value = lg.append('text').attr('transform', 'translate(0,20)').attr('text-anchor','middle').text(0);

    var lineData = [ [config.pointerWidth / 2, 0],
      [0, -pointerHeadLength],
      [-(config.pointerWidth / 2), 0],
      [0, config.pointerTailLength],
      [config.pointerWidth / 2, 0] ];
    var pointerLine = d3.svg.line().interpolate('monotone');
    var pg = svg.append('g').data([lineData])
      .attr('class', 'pointer')
      .attr('transform', centerTx);

    pointer = pg.append('path')
      .attr('d', pointerLine/*function(d) { return pointerLine(d) + 'Z';}*/ )
      .attr('transform', 'rotate(' + config.minAngle + ')');

    update(newValue === undefined ? 0 : newValue);
  }
  that.render = render;

  function update(newValue, newConfiguration) {
    if ( newConfiguration !== undefined) {
      configure(newConfiguration);
    }
    var ratio = scale(newValue);
    var newAngle = config.minAngle + (ratio * range);
    pointer.transition()
      .duration(config.transitionMs)
      .ease('elastic')
      .attr('transform', 'rotate(' + newAngle + ')');
    value.text((Math.abs(newValue) * 100).toFixed(2));
  }
  that.update = update
  configure(configuration);

  return that;
}

var lrGauge;

function updateLrGauge(input) {
  console.log(input);
  // just pump in random data here...
  lrGauge.update(Math.random()* 2 - 1);
}

function updateRealGauge(input) {
  console.log(input);
  // just pump in random data here...
  realGauge.update(input);
}

var realGauge;

function onDocumentReady() {
  lrGauge = lrgauge('#lr-gauge', {
    size: 100,
    clipWidth: 150,
    clipHeight: 200,
    ringWidth: 20,
    minValue: -1,
    maxValue: 1,
    transitionMs: 4000,
  });
  lrGauge.scale
  lrGauge.render();

   realGauge = real_gauge('#real-gauge', {
    size: 100,
    clipWidth: 150,
    clipHeight: 200,
    ringWidth: 20,
    minValue: 0,
    maxValue: 1,
    transitionMs: 4000,
  });
  realGauge.scale
  realGauge.render();


  // every few seconds update reading values
  updateLrGauge("Hi");
  updateRealGauge("Real");
}

if( !window.isLoaded ) {
  window.addEventListener("load", function() {
    onDocumentReady();
  }, false);
} else {
  onDocumentReady();
}



function onError(err){
  console.error(err);
}

function main(tabs) {
  getAccuracy(getURL(tabs));
}

chrome.tabs.query({
    active: true,
    currentWindow: true
}, main);

