//
// Timers for auto-refresh loop
//

function hashConversion(hashes) {
    if (hashes > 1000000) {
        return Math.floor(hashes / 1000000) + "." + (hashes % 1000000).toString().substring(0, 1) + " MH/s"
    }
    if (hashes > 1000) {
        return Math.floor(hashes / 1000) + "." + (hashes % 1000).toString().substring(0, 1) + " KH/s"
    }
    return hashes + " H/s"
}

function truncateAddress(string) {
  if (string.length > 40)
    return string.substring(0,40)+'...';
  else
    return string;
};

function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}


$.ajax({
    url: "app/pool-api/js/network.js",
    dataType: "script",
    success: function () {
        setTimeout(function () {
            network_api = new NetworkApi();
        }, 100);
    }
});

$.ajax({
    url: "app/pool-api/js/pool.js",
    dataType: "script",
    success: function () {
        setTimeout(function () {
            pool_api = new PoolApi();
        }, 100);
    }
});

$.ajax({
    url: "app/pool-api/js/miner.js",
    dataType: "script",
    success: function () {
        setTimeout(function () {
            miner_api = new MinerApi();
            miner_api._update_miner_global_stats();
        }, 100);
    }
});


var minerPaymentsTableInterval = {};
function loadMinerStatsTable() {
      clearInterval(minerPaymentsTableInterval);
      var minerPaymentsTableUrl = "https://api.xmrpool.net/miner/x/payments";
      if ((typeof(miner_api) !== 'undefined') && (typeof(miner_api.miner_address) === 'string') && (miner_api.miner_address != "")) {
        var minerPaymentsTableUrl = "https://api.xmrpool.net/miner/" + miner_api.miner_address + "/payments";
      }
      var minerPaymentsTable = $("#miner-payments-table").DataTable({
        "processing": true,
        "ajax": {
          "url": minerPaymentsTableUrl, 
          "dataSrc": ""
        },
	"order": [[ 1, 'desc' ]],
	"deferRender": true,
	"columns": [
	   {
             "data": "pt",
	   },
	   {
             "data": "ts",
	     "render": function (data, type, row) {
		  return timeRender(data, type, row);
             }
	   },
	   {
	     "data": "amount",
	     "render": function (data, type) {
                  if (type === 'display' || type === 'filter') {
	              return (data / 1000000000000);
		  }
		  return data;
	     }
	   },
	   {
	     "data": "txnHash",
	     "render": function (data, type) {
		  if (type === 'display' || type === 'filter') {
                      return '<a href="http://chainradar.com/xmr/transaction/' + data + '" target="_blank">' + data + '</a>';
		  }
		  return data;
	     }
	   },
	   {
	     "data": "mixin"
	   }
      ]});
}
      minerPaymentsTableInterval = setInterval(function () {
	  if (miner_api.miner_address !== "") {
            minerPaymentsTable.ajax.reload(null, false);
	  }
      }, 10000);

$(document).ready(function () {
    $("#home").load("/app/home.html");
    $("#pool-stats").load("/app/pool.html");
    $("#miner-stats").load("/app/miner.html", function() { 
      loadMinerStatsTable();
    });

    $("#pool-getting-started").load("/app/gettingStarted.html");
    $("#pool-blocks").load("/app/blocks.html", function () {
        var poolBlocksTable = $("#pool-blocks-table").DataTable({
            "processing": true,
            "ajax": {
                "url": "https://api.xmrpool.net/pool/blocks",
                "dataSrc": ""
            },
            "order": [[ 4, 'desc' ]],
            "deferRender": true,
            "columns": [
                {
                    "data": "height"
                },
                {
                    "data": "diff",
                    "render": function (data, type) {
                        if (type === 'display' || type === 'filter') {
                            return Humanize.intComma(data);
                        }
                        return data;
                    }
                },
                {
                    "data": "shares",
                    "render": function (data, type) {
                        if (type === 'display' || type === 'filter') {
                            return Humanize.intComma(data);
                        }
                        return data;
                    }
                },
                {
                    "data": "hash",
                    "render": function (data, type) {
                        if (type === 'display' || type === 'filter') {
                            return '<a href="http://chainradar.com/xmr/block/' + data + '" target="_blank">' + data.substring(0, 13) + '...</a>';
                        }
                        return data;
                    }
                },
                {
                    "data": "ts",
                    "render": function (data, type, row) {
                        return timeRenderuSec(data, type, row);
                    }
                },
                {
                    "data": "pool_type",
                    "render": function (data) {
                        return data.toUpperCase();
                    }
                },
                {
                    "data": null,
                    "render": function (data, type, row) {
                        return Humanize.formatNumber((row.shares / row.diff) * 100, 2) + "%";
                    }
                }
            ]
        });
        setInterval(function () {
            poolBlocksTable.ajax.reload(null, false);
        }, 120000);
    });
    $("#pool-payments").load("/app/payments.html", function () {
        var poolPaymentsTable = $("#pool-payments-table").DataTable({
            "processing": true,
            "ajax": {
                "url": "https://api.xmrpool.net/pool/payments",
                "dataSrc": ""
            },
            "order": [[ 0, 'desc' ]],
            "deferRender": true,
            "columns": [
                {
                    "data": "ts",
                    "render": function (data, type, row) {
                        return timeRenderuSec(data, type, row);
                    }
                },
                {
                    "data": "hash",
                    "render": function (data, type) {
                        if (type === 'display' || type === 'filter') {
                            return '<a href="http://chainradar.com/xmr/transaction/' + data + '" target="_blank">' + data.substring(0, 13) + '...</a>';
                        }
                        return data;
                    }
                },
                {
                    "data": "value",
                    "render": function (data, type) {
                        if (type === 'display' || type === 'filter') {
                            return (data / 1000000000000).toString().trim('0') + " XMR";
                        }
                        return data;
                    }
                },
                {
                    "data": "fee",
                    "render": function (data, type) {
                        if (type === 'display' || type === 'filter') {
                            return (data / 1000000000000).toString().trim('0') + " XMR";
                        }
                        return data;
                    }
                },
                {"data": "mixins"},
                {"data": "payees"},
                {
                    "data": "pool_type",
                    "render": function (data) {
                        return data.toUpperCase();
                    }
                }
            ]
        });
        setTimeout(function () {
            poolPaymentsTable.ajax.reload(null, false);
        }, 120000);
    });
    setTimeout(initTables, 2000);
    setTimeout(refreshStats15Sec, 500);
    setTimeout(pageInit, 500);
});

function timeRender(data, type) {
    if (type === 'display' || type === 'filter') {
        var d = moment.utc(data * 1000);
        return d.format('L') + " " + d.format('HH:mm:ss') + " UTC"
    }
    return data;
}

function timeRenderuSec(data, type) {
    if (type === 'display' || type === 'filter') {
        var d = moment.utc(data);
        return d.format('L') + " " + d.format('HH:mm:ss') + " UTC"
    }
    return data;
}

var portColumns = [
    {"data": "host.hostname"},
    {"data": "port"},
    {"data": "difficulty"},
    {"data": "description"},
    {"data": "miners"},
    {"data": "host.blockID"},
    {
        "data": "host.blockIDTime",
        "render": function (data, type, row) {
            return timeRender(data, type, row);
        }
    }
];

var initTables = function () {
    $("#pool-ports-table-pps").DataTable({
        "processing": true,
        "ajax": {
            "url": "https://api.xmrpool.net/pool/ports",
            "dataSrc": "pps"
        },
        "deferRender": true,
        "searching": false,
        "info": false,
        "paging": false,
        "columns": portColumns
    });
    $("#pool-ports-table-pplns").DataTable({
        "processing": true,
        "ajax": {
            "url": "https://api.xmrpool.net/pool/ports",
            "dataSrc": "pplns"
        },
        "deferRender": true,
        "searching": false,
        "info": false,
        "paging": false,
        "columns": portColumns
    });
    $("#pool-ports-table-solo").DataTable({
        "processing": true,
        "ajax": {
            "url": "https://api.xmrpool.net/pool/ports",
            "dataSrc": "solo"
        },
        "deferRender": true,
        "searching": false,
        "paging": false,
        "info": false,
        "columns": portColumns
    });
    $("#pool-ports-table-global").DataTable({
        "processing": true,
        "ajax": {
            "url": "https://api.xmrpool.net/pool/ports",
            "dataSrc": "global"
        },
        "deferRender": true,
        "searching": false,
        "paging": false,
        "info": false,
        "columns": [
            {"data": "host.hostname"},
            {"data": "port"},
            {"data": "pool_type"},
            {"data": "difficulty"},
            {"data": "description"},
            {"data": "miners"},
            {"data": "host.blockID"},
            {
                "data": "host.blockIDTime",
                "render": function (data, type, row) {
                    return timeRender(data, type, row);
                }
            }
        ]
    });
};

var pageInit = function () {
    network_api._update_pool_info();
    refreshStats15Sec();
    refreshStats30Sec();
    refreshStats60Sec();
};

var refreshStats3Sec = function () {
    network_api.update_home_page();
    pool_api.update_home_page();
};

var refreshStats15Sec = function () {
    network_api._update_network_stats();
    pool_api._update_pool_stats();
};

var refreshStats30Sec = function() {
    miner_api.refresh_thirty_seconds();
    miner_api._update_miner_global_stats();
};

var refreshStats60Sec = function() {
    miner_api.refresh_sixty_seconds();
};

setInterval(refreshStats15Sec, 15000);
setInterval(refreshStats30Sec, 30000);
setInterval(refreshStats60Sec, 60000);
setInterval(refreshStats3Sec, 3000);

setTimeout(function() {
  miner_api.get_miner_address();
  miner_api._update_miner_global_stats(miner_api.miner_address);
}, 2000);
