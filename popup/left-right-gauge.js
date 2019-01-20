var gauge = function(container, configuration) {
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
    return 'translate('+ config.clipWidth / 2 + ',' + r + ')';
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
        .attr('id','lrGradient');

    svg.select('defs')
      .select('linearGradient')
      .append('stop')
        .attr('offset','5%')
        .attr('stop-color', '#0000FF')

    svg.select('defs')
      .select('linearGradient')
      .append('stop')
        .attr('offset','5%')
        .attr('stop-color', '#FF0000')



    var arcs = svg.append('g')
      .attr('class', 'arc')
      .attr('transform', centerTx);

    arcs.selectAll('path')
      .data(tickData)
      .enter().append('path')
      .attr('fill', function(d, i) {
        return config.arcColorFn(d * i);
      })
      .attr('d', arc);

    var lg = svg.append('g')
      .attr('class', 'label')
      .attr('transform', centerTx);
    lg.append('text').attr('transform', 'rotate(-90) translate(0,-56) rotate(90)').text('Left');
    lg.append('text').attr('transform', 'rotate(90) translate(0,-32) rotate(-90)').text('Right');
    lg.append('text').attr('transform', 'translate(0,-32)').attr('text-anchor','middle').text('Center');
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


function onDocumentReady() {
  var powerGauge = gauge('#lr-gauge', {
    size: 100,
    clipWidth: 150,
    clipHeight: 100,
    ringWidth: 20,
    minValue: -1,
    maxValue: 1,
    transitionMs: 4000,
  });
  powerGauge.scale
  powerGauge.render();

  function updateReadings() {
    // just pump in random data here...
    powerGauge.update(Math.random()* 2 - 1);
  }

  // every few seconds update reading values
  updateReadings();
  setInterval(function() {
    updateReadings();
  }, 5 * 1000);
}

if( !window.isLoaded ) {
  window.addEventListener("load", function() {
    onDocumentReady();
  }, false);
} else {
  onDocumentReady();
}

