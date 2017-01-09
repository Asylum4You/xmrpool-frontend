var MinerApi = function () {};

MinerApi.prototype._get_miner_global_stats = function (miner_address) {
   $.ajax({
        type: "GET",
        url: "https://api.xmrpool.net/miner/" + miner_address + "/stats/",
        cache: true,
        dataType: 'json'
    }).done(function (html) {
       if (html) {
         
         $('#miner-amt-due').html(html.amtDue / 1000000000000 + " XMR");
         $('#miner-total-paid').html(html.amtPaid / 1000000000000 + " XMR");
         $('#miner-total-hashes').html(html.totalHashes);
         $('#miner-hash-rate').html(hashConversion(html.hash));
         $('#miner-lastHash').html(timeSince(html.lastHash * 1000) + " ago");
       }
    });
};


MinerApi.prototype._update_miner_global_stats = function () {
  this.get_miner_address();
  if (this.miner_address != "") {
    this._get_miner_global_stats(this.miner_address);
    setTimeout(this._get_miner_global_stats(this.miner_address), 60000);
  };
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
  } else if (this.is_valid_xmr_address(address)) {
    this.miner_address = address;
    this.miner_address_type = "XMR";
  } else {
    return false;
  };

  try {
  if (minerPaymentsTable) {
	console.log('Entered loop!');
    minerPaymentsTable.ajax.url('https://api.xmrpool.net/miner/' + this.miner_address + '/payments');
    minerPaymentsTable.ajax.url('https://api.xmrpool.net/miner/' + this.miner_address + '/payments').load();
  } else {
    console.log('Didn\'t enter loop');
  }
  } catch(err) {};

  replaceFormWithAddress(this.miner_address);
  this._update_miner_global_stats();
  return true;
}; 

MinerApi.prototype.refresh_five_seconds = function () {
  this.miner_address = this.get_miner_address();
  if (this.miner_address !== "") {
  }
};

MinerApi.prototype.refresh_thirty_seconds = function () {
  this.miner_address = this.get_miner_address();
  if (this.miner_address !== "") {
  }
};

MinerApi.prototype.refresh_sixty_seconds = function () {
  this.miner_address = this.get_miner_address();
  if (this.miner_address !== "") {
  }
};

MinerApi.prototype.is_valid_xmr_address = function (address) {
  if (typeof(address) === 'string') {
    address = address.split('.');
  } else {
    return false;
  };
  if ((address[0].length == 95 || address[0].length == 106) && address[0].slice(0, 1) == '4') {
    return true;
  } else { return false; }
};

MinerApi.prototype.is_valid_btc_address = function (address) {
  if (typeof(address) === 'string') {
    address = address.split('.');
  } else {
    return false;
  }
  if (address[0].length >= 26 && address[0].length <= 35 && 
		  (address[0].slice(0, 1) == '1' ||
		   address[0].slice(0, 1) == '3' ||
		   address[0].slice(0, 1) == '5')
      ) {
    return true;
  } else { return false; }
};                                                                                                            
