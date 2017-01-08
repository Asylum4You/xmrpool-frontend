var NetworkApi = function () {
};

NetworkApi.prototype._update_network_stats = function () {
    $.ajax({
        type: "GET",
        url: "https://api.xmrpool.net/network/stats/",
        cache: true,
        dataType: 'json'
    }).done(function (html) {
            if (html) {
                $('#network-last-block').html(html.height);
                $('#network-difficulty').html(html.difficulty);
                $('#network-hash-rate').html(hashConversion(Math.floor(html.difficulty / 120)));
                $('#network-last-hash').html('<a href="http://chainradar.com/xmr/block/' + html.hash + '" target="_blank">' + html.hash.substring(0, 13) + '...</a>');
                $('#network-reward').html((html.value / 1000000000000).toPrecision(13) + " XMR");
                var t = new Date(html.ts * 1000);
                var formatted_ts = t.toISOString();
                $('#network-timestamp').html(formatted_ts);
            }
        }
    )
};

