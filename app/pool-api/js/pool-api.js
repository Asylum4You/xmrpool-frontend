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
                console.log(data);
                var d = moment.utc(data * 1000);
                return d.format('L') + " " + d.format('LTS')
            }
            return data;
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
        "columns":[
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
                        return d.getFullYear() + "/" + d.getMonth() + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + " UTC"
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