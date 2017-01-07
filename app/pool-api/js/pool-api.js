//
// Timers for auto-refresh loop
//

$.ajax({
  url: "app/pool-api/js/network.js",
  dataType: "script"
});

$(document).ready(function () {
  $( "#home" ).load( "/app/home.html" );
  $( "#pool-stats" ).load( "/app/pool.html" );
  var loaded = false;
  while (!loaded) {
    try {
      setTimeout(refreshStats(), 100);
      loaded = true;
    } catch(err) {}
  }

});

var refreshStats = function () {
  var network_api = new NetworkApi();
  network_api._update_network_stats();
};

setInterval(refreshStats, 5000);
