//
// Timers for auto-refresh loop
//

var network_api = {};

$.ajax({
  url: "app/pool-api/js/network.js",
  dataType: "script",
  success: function () {
    setTimeout(function() { network_api = new NetworkApi(); }, 100);
  }
});

$(document).ready(function () {
  $( "#home" ).load( "/app/home.html" );
  $( "#pool-stats" ).load( "/app/pool.html" );
  setTimeout(refreshStats, 500);
});


var refreshStats = function () {
  network_api._update_network_stats();
};

setInterval(refreshStats, 5000);
