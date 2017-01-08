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
                    $('#pool-last-block-found-time').html(timeSince(html.pool_statistics.lastBlockFoundTime*1000) + " ago");
                    $('#pool-total-blocks-found').html(html.pool_statistics.totalBlocksFound);
                    $('#pool-total-hash-rate').html(hashConversion(html.pool_statistics.hashRate));
                    $('#pool-total-miners').html(html.pool_statistics.miners);
                }
            }
        )
};


