var config = require("../config");
var request = require("request");

var instadiff = {
    follows: {},
    followed_by: {},
    api_url: 'https://api.instagram.com/v1',
    access_token: null,
    user_id: null,
    getUrl: function (method, callback) {
        callback(
            this.api_url
            + "/users/self/"
            + method
            + "?access_token="
            + this.access_token
        );
    },
    getApiRequest: function (method, variable, callback) {
        instadiff.getUrl(method, function (url) {
            console.log(method);
            console.log(url);
            request(
                url,
                function (err, response, body) {
                    if (err || response.statusCode !== 200) {
                        return false;
                    }
                    console.log(method);
                    console.log(JSON.parse(body));
                    instadiff[variable] = JSON.parse(body);
                    callback();
                }
            );
        });
    },
    getAccessToken: function(query, callback) {
        request.post({
            url: "https://api.instagram.com/oauth/access_token",
            form: {
                client_id: config.instagram.clientId,
                client_secret: config.instagram.clientSecret,
                grant_type: 'authorization_code',
                redirect_uri: config.url + config.instagram.redirect_uri + "?userid=" + query.login,
                code: query.code
            }
        }, function(err, response, body) {
            if (err || response.statusCode != 200) {
                return {error: err};
            }
            instadiff.access_token = JSON.parse(body).access_token;
            callback();
        });
    }
};

/**
 * @param query
 * @param callback
  */
instadiff.get = function (query, callback) {
    this.user_id = query.login;
    this.getAccessToken(query, function() {
        instadiff.getApiRequest('follows', 'follows', function() {
            instadiff.getApiRequest('followed-by', 'followed_by', function() {
                callback(this.follows, this.followed_by);
            });
        });
    });
};

module.exports = instadiff;