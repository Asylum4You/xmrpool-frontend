function PoolApi () {

  this._update_pool_stats = function () {
    var self = this;
    $.ajax({
        type: "GET",
        url: "https://api.xmrpool.net/pool/stats/",
        cache: true,
        dataType: 'json'
    }).done(function (html) {
        if (html) {
	  self.pool_stats = html;
	  self.update_home_page();
        }
      }
    )
  };

  this.update_home_page = function () {
    $('#pool-last-block-found').html(this.pool_stats.pool_statistics.lastBlockFound);
    $('#pool-last-block-found-time').html('<span data-toggle="tooltip" title="' + moment(this.pool_stats.pool_statistics.lastBlockFoundTime*1000).toISOString() + '">' + timeSince(this.pool_stats.pool_statistics.lastBlockFoundTime*1000) + " ago");
    $('#pool-total-blocks-found').html(this.pool_stats.pool_statistics.totalBlocksFound);
    $('#pool-total-hash-rate').html(hashConversion(this.pool_stats.pool_statistics.hashRate));
    $('#pool-total-miners').html(this.pool_stats.pool_statistics.miners);
  };
};
