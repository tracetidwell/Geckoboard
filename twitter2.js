function geckoboard () {
    var followers_count = fi_count();

    var API_KEY = '438a0d1a969170f404b792cf5ce760f4';
    var gb = require('geckoboard')(API_KEY);

    gb.ping(function (err) {
        if (err) {
            console.error(err);
            return;
        }

        console.log('Authentication successful');
    });

    gb.datasets.findOrCreate(
    {
    id: 'twitter_followers',
        fields: {
            followers: {
                type: 'number',
                name: 'Number of Followers'
            }
        }
    },

    function fi_count () {
        var data_all;
        var followers_ids;
        var followers_count;

        var success = function (data) {
            //console.log('Data [%s]', data)
            //console.log(JSON.parse(data));
            data_all = JSON.parse(data);
            followers_ids = data_all.ids;
            followers_count = followers_ids.length;
            console.log(followers_count);
        };

        var error = function (err, response, body) {
            console.log('ERROR [%s]', err);
        };

        var config = {
            "consumerKey": "cpbEnrZDyEgKru5MjsalZpuaK",
            "consumerSecret": "vLoxRtkpyAdWxkp3IGZdB3ay8u5arsaIJEUeY6RkBm824QdNDI",
            "accessToken": "732265260183228417-EyVi0GOOZth4Zci7SlaYxtFHWXydlyT",
            "accessTokenSecret": "1oUdLnRImsgzajYZxz1ABoBpUB8euauFsadIEBt16YAB9"
        };

        var Twitter = require('twitter-node-client').Twitter;
        var twitter = new Twitter(config);

        twitter.getFollowersIds({screen_name: 'geckoboard'}, error, success);

        return followers_count;
    };
  
    function (err, dataset) {
        if (err) {
            console.error(err);
            return;
        }

        dataset.put(
            [{ followers:followers_count}],
        
            function (err) {
                if (err) {
                    console.error(err);
                    return;
                }

                console.log('Dataset created and data added');
            }
        );
    }
    );
};

geckoboard();