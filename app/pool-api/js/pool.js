var PoolApi = function () {
};

PoolApi.prototype._update_pool_stats = function () {
    $.ajax({
        type: "GET",
        url: "https://api.xmrpool.net/pool/stats/",
        cache: true,
        dataType: 'json'
    })
        .done(function (html) {

                if (html) {
                    $('#pool-last-block-found').html(html.pool_statistics.lastBlockFound);
                    $('#pool-last-block-found-time').html(html.pool_statistics.lastBlockFoundTime);
                    $('#pool-total-blocks-found').html(html.pool_statistics.totalBlocksFound);
                    $('#pool-total-hash-rate').html(html.pool_statistics.hashRate);
                    $('#pool-total-miners').html(html.pool_statistics.miners);
                }
            }
        )
};


PoolApi.prototype._update_pool_ports = function () {
    $.ajax({
        type: "GET",
        url: "https://api.xmrpool.net/pool/ports/",
        cache: true,
        dataType: 'json'
    })
        .done(function (html) {
                if (html) {
                    for (var poolType in html){
                        if (html.hasOwnProperty(poolType)){
                            html[poolType].forEach(function(port){
                                var blockTime = new Date(port.host.blockIDTime * 1000);
                                $('#pool-ports-table-'+poolType).find("tr").remove();
                                if(poolType === 'global'){
                                    $('#pool-ports-table-'+poolType).append(
                                        "<tr><td>" + port.host.hostname +
                                        "</td><td>" + port.port +
                                        "</td><td>" + port.portType +
                                        "</td><td>" + port.difficulty +
                                        "</td><td>" + port.description +
                                        "</td><td>" + port.miners +
                                        "</td><td>" + port.host.blockID +
                                        "</td><td>" + blockTime.toISOString() +
                                        "</tr>"
                                    )
                                } else {
                                    $('#pool-ports-table-'+poolType).append(
                                        "<tr><td>" + port.host.hostname +
                                        "</td><td>" + port.port +
                                        "</td><td>" + port.difficulty +
                                        "</td><td>" + port.description +
                                        "</td><td>" + port.miners +
                                        "</td><td>" + port.host.blockID +
                                        "</td><td>" + blockTime.toISOString() +
                                        "</tr>"
                                    )
                                }
                            })
                        }
                    }
                }
            }
        )
};

