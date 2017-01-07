//
// Timers for auto-refresh loop
//

$.ajax({
  url: "app/pool-api/js/network.js",
  dataType: "script"
});


setInterval(function() {
  var network_api = new NetworkApi();
  network_api._update_network_stats();
}, 5000);
