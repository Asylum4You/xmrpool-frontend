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
        $('#ajax-last-block').html(html.height);
      } else { 
        $('#ajax-last-block').html("ERROR");
        $('#ajax-last-block').css("color", "red");
      }
  }
)};

