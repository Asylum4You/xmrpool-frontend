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
MinerApi.prototype.miner_address_type = "";

MinerApi.prototype.get_miner_address = function () {
  if (this.miner_address === "") {
    this.set_miner_address(Cookies.get('miner-address'));
  }
  return this.miner_address;
};

MinerApi.prototype.set_miner_address = function (address) {
  if (this.is_valid_btc_address(address)) {
    this.miner_address = address;
    this.miner_address_type = "BTC";
    return true;
  } else if (this.is_valid_xmr_address(address)) {
    this.miner_address = address;
    this.miner_address_type = "XMR";
    return true;
  } else {
    return false;
  }
}; 

MinerApi.prototype.refresh_five_seconds = function () {
  this.miner_address = this.get_miner_address();
  if (this.miner_address !== "") {
    this._update_miner_global_stats(this.miner_address);
  }
};

MinerApi.prototype.is_valid_xmr_address = function (address) {
  if (address.length == 95 && address.slice(0, 1) == '4') {
    return true;
  } else { return false; }
};

MinerApi.prototype.is_valid_btc_address = function (address) {
  if (address.length >= 26 && address.length <= 35 && 
		  (address.slice(0, 1) == '1' ||
		   address.slice(0, 1) == '3' ||
		   address.slice(0, 1) == '5')
      ) {
    return true;
  } else { return false; }
};                                                                                                            
