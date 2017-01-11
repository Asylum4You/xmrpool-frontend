function NetworkApi () {

  this._update_network_stats = function () {
    var self = this;
    $.ajax({
          type: "GET",
          url: "https://api.xmrpool.net/network/stats/",
          cache: true,
          dataType: 'json'
      }).done(function (html) {
              if (html) {
		  self.network_stats = html;
		  self.update_home_page();
              }
          }
      )
  };
  
  this._update_pool_info = function () {
      var self = this;
      $.ajax({
          type: "GET",
          url: "https://api.xmrpool.net/config/",
          cache: true,
          dataType: 'json'
      }).done(function (html) {
              if (html) {
		  self.pool_info = html;
		  self.update_home_page();
              }
          }
      )
  };

  this.update_home_page = function () {
    if (typeof(this.network_stats !== 'undefined') &&
        typeof(this.pool_info !== 'undefined')) {
      $('#network-last-block').html(this.network_stats.height);
      $('#network-difficulty').html(this.network_stats.difficulty);
      $('#network-hash-rate').html(hashConversion(Math.floor(this.network_stats.difficulty / 120)));
      $('#network-last-hash').html('<a href="http://chainradar.com/xmr/block/' + this.network_stats.hash + '" target="_blank" data-toggle="tooltip" title="' + this.network_stats.hash + '">' + this.network_stats.hash.substring(0, 13) + '...</a>');
      $('#network-reward').html((this.network_stats.value / 1000000000000).toString().trim('0') + " XMR");
      $('#network-timestamp').html('<span data-toggle="tooltip" title="' + moment(this.network_stats.ts).toISOString() + '">' + timeSince(this.network_stats.ts*1000) + " ago");
      $('#pplns_fee').html(this.pool_info.pplns_fee + " %");
      $('#pps_fee').html(this.pool_info.pps_fee + " %");
      $('#solo_fee').html(this.pool_info.solo_fee + " %");
      $('#btc_fee').html(this.pool_info.btc_fee + " %");
      $('#min_wallet_payout').html((this.pool_info.min_wallet_payout / 1000000000000).toString().trim('0') + " XMR");
      $('#min_btc_payout').html((this.pool_info.min_btc_payout / 1000000000000).toString().trim('0') + " XMR");
      $('#maturity_depth').html(this.pool_info.maturity_depth);
      $('#pool_dev_donation').html(this.pool_info.pool_dev_donation + " %");
      $('#min_denom').html((this.pool_info.min_denom / 1000000000000).toString().trim('0'));
      $('#min_exchange_payout').html((this.pool_info.min_exchange_payout / 1000000000000).toString().trim('0') + " XMR");
      $('#dev_donation').html((this.pool_info.dev_donation / 1000000000000).toString().trim('0') + " %");
    }
  };
};
