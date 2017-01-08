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

$(document).ready(function () {
    $("#home").load("/app/home.html");
    $("#pool-stats").load("/app/pool.html");
    $("#pool-getting-started").load("/app/gettingStarted.html");
    setTimeout(initTables, 2000);
    setTimeout(refreshStats5Sec, 500);
});

var initTables = function () {
    $("#pool-ports-table-pps").DataTable({
        "processing": true,
        "ajax": "https://api.xmrpool.net/pool/ports",
        "deferRender": true,
        "columns": [
            {"pps": "host.hostname"},
            {"pps": "port"},
            {"pps": "difficulty"},
            {"pps": "description"},
            {"pps": "miners"},
            {"pps": "host.blockID"},
            {
                "pps": "host.blockIDTime",
                "render": function (data, type, row) {
                    if (type === 'display' || type === 'filter') {
                        var d = new Date(data * 1000);
                        return d.toISOString();
                    }
                    return data;
                }
            }
        ]
    });
    $("#pool-ports-table-pplns").DataTable({
        "processing": true,
        "ajax": "https://api.xmrpool.net/pool/ports",
        "deferRender": true,
        "columns": [
            {"pplns": "host.hostname"},
            {"pplns": "port"},
            {"pplns": "difficulty"},
            {"pplns": "description"},
            {"pplns": "miners"},
            {"pplns": "host.blockID"},
            {
                "pplns": "host.blockIDTime",
                "render": function (data, type, row) {
                    if (type === 'display' || type === 'filter') {
                        var d = new Date(data * 1000);
                        return d.toISOString();
                    }
                    return data;
                }
            }
        ]
    });
    $("#pool-ports-table-solo").DataTable({
        "processing": true,
        "ajax": "https://api.xmrpool.net/pool/ports",
        "deferRender": true,
        "columns": [
            {"solo": "host.hostname"},
            {"solo": "port"},
            {"solo": "difficulty"},
            {"solo": "description"},
            {"solo": "miners"},
            {"solo": "host.blockID"},
            {
                "solo": "host.blockIDTime",
                "render": function (data, type, row) {
                    if (type === 'display' || type === 'filter') {
                        var d = new Date(data * 1000);
                        return d.toISOString();
                    }
                    return data;
                }
            }
        ]
    });
    $("#pool-ports-table-global").DataTable({
        "processing": true,
        "ajax": "https://api.xmrpool.net/pool/ports",
        "deferRender": true,
        "columns":[
            {"global": "host.hostname"},
            {"global": "port"},
            {"global": "pool_type"},
            {"global": "difficulty"},
            {"global": "description"},
            {"global": "miners"},
            {"global": "host.blockID"},
            {
                "global": "host.blockIDTime",
                "render": function (data, type, row) {
                    if (type === 'display' || type === 'filter') {
                        var d = new Date(data * 1000);
                        return d.toISOString();
                    }
                    return data;
                }
            }
        ]
    });
};

var refreshStats5Sec = function () {
    network_api._update_network_stats();
    pool_api._update_pool_stats();
};


setInterval(refreshStats5Sec, 5000);