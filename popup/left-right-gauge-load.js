function onDocumentReady() {
  var powerGauge = gauge('#power-gauge', {
    size: 300,
    clipWidth: 300,
    clipHeight: 300,
    ringWidth: 60,
    maxValue: 10,
    transitionMs: 4000,
  });
  powerGauge.render();

  function updateReadings() {
    // just pump in random data here...
    powerGauge.update(Math.random() * 10);
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

