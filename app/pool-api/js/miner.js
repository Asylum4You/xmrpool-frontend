var MinerApi = function () {}; 

MinerApi.prototype._update_miner_global_stats = function (miner_address) {
   $.ajax({
        type: "GET",
        url: "https://api.xmrpool.net/miner/" + miner_address + "/stats/",
        cache: true,
        dataType: 'json'
    }).done(function (html) {
            if (html) {
            }
        }
    )
};

MinerApi.prototype.miner_address = "";

MinerApi.prototype.get_miner_address = function () {
  if isEmpty(this.miner_address) {
    return this.miner_address;
  } else {
    return Cookie.get('miner-address') || "";
  }
};

MinerApi.prototype.refresh_five_seconds = function () {
  this.miner_address = this.get_miner_address();
  if isEmpty(this.miner_address) {
    this._update_miner_global_stats(this.miner_address);
  }
};
  
