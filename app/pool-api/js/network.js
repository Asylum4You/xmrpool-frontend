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
                $('#network-reward').html((html.value / 1000000000000).toString().trim('0') + " XMR");
                $('#network-timestamp').html(timeSince(html.ts*1000) + " ago");
            }
        }
    )
};

NetworkApi.prototype._update_pool_info = function () {
    $.ajax({
        type: "GET",
        url: "https://api.xmrpool.net/config/",
        cache: true,
        dataType: 'json'
    }).done(function (html) {
            if (html) {
                $('#pplns_fee').html(html.pplns_fee + " %");
                $('#pps_fee').html(html.pps_fee + " %");
                $('#solo_fee').html(solo_fee + " %");
                $('#btc_fee').html(btc_fee + " %");
                $('#min_wallet_payout').html((html.min_wallet_payout / 1000000000000).toString().trim('0') + " XMR");
                $('#min_btc_payout').html((html.min_btc_payout / 1000000000000).toString().trim('0') + " XMR");
                $('#maturity_depth').html(maturity_depth);
                $('#pool_dev_donation').html(pool_dev_donation + " %");
                $('#min_denom').html((html.min_denom / 1000000000000).toString().trim('0') + " XMR");
                $('#min_exchange_payout').html((html.min_exchange_payout / 1000000000000).toString().trim('0') + " XMR");
                $('#dev_donation').html((html.dev_donation / 1000000000000).toString().trim('0') + " XMR");
            }
        }
    )
};