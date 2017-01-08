//
// Timers for auto-refresh loop
//

var network_api = {};
var pool_api = {};

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
            if (type === 'display' || type === 'filter') {
                var d = new Date(data * 1000);
                return d.toISOString();
            }
            return data;
        }
    }
];

var portColumnsGlobal = [
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
            if (type === 'display' || type === 'filter') {
                var d = new Date(data * 1000);
                return d.toISOString();
            }
            return data;
        }
    }
];

$(document).ready(function () {
    $("#home").load("/app/home.html");
    $("#pool-stats").load("/app/pool.html");
    $("#pool-getting-started").load("/app/gettingStarted.html");
    $("#pool-ports-table-pps").DataTable({
        "processing": true,
        "ajax": "https://api.xmrpool.net/pool/ports/",
        "deferRender": true,
        "dataSrc": 'pps',
        "columns": portColumns
    });
    $("#pool-ports-table-pplns").DataTable({
        "processing": true,
        "ajax": "https://api.xmrpool.net/pool/ports/",
        "deferRender": true,
        "dataSrc": 'pplns',
        "columns": portColumns
    });
    $("#pool-ports-table-solo").DataTable({
        "processing": true,
        "ajax": "https://api.xmrpool.net/pool/ports/",
        "deferRender": true,
        "dataSrc": 'solo',
        "columns": portColumns
    });
    $("#pool-ports-table-global").DataTable({
        "processing": true,
        "ajax": "https://api.xmrpool.net/pool/ports/",
        "deferRender": true,
        "dataSrc": 'global',
        "columns": portColumnsGlobal
    });

    setTimeout(refreshStats5Sec, 500);
});


var refreshStats5Sec = function () {
    network_api._update_network_stats();
    pool_api._update_pool_stats();
};


setInterval(refreshStats5Sec, 5000);