var NetworkApi = function () {};

NetworkApi.prototype._update_network_stats = function() {
  $.ajax({
    type: "GET",
    url: "https://api.xmrpool.net/network/stats/",
    cache: true,
    dataType: 'json'
    })
    .done(function(html) {

      if(html) { 
        $('#network-last-block').html(html.height);
        $('#network-difficulty').html(html.difficulty);
        $('#network-last-hash').html(html.hash);
	$('#network-reward').html((html.value / 1000000000000).toPrecision(13) + " XMR");
	var t = new Date(html.ts*1000);
        var formatted_ts = t.toISOString();
	$('#network-timestamp').html(formatted_ts);
      } 
  }
)};

