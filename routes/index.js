var express = require('express');
var config = require("../config");
var instadiff = require("../bin/instadiff");
var router = express.Router();

router.get('/', function (req, res, next) {
    if (req.query.code && req.query.login) {
        instadiff.get(req.query, function () {
            res.render(
                'index',
                {
                    title: config.title,
                    description: config.description,
                    login: req.query.login,
                    follows: instadiff.follows,
                    followed_by: instadiff.followed_by
                }
            );
        });
    } else {
        res.render(
            'index',
            {
                title: config.title,
                description: config.description,
                login: null,
                follows: null,
                followed_by: null
            }
        );
    }
});

router.get('/get_access', function (req, res, next) {
    if (req.query.login) {
        res.redirect(
            "https://api.instagram.com/oauth/authorize/?client_id="
            + config.instagram.clientId
            + "&response_type=code"
            + "&scope=follower_list"
            + "&redirect_uri="
            + encodeURIComponent(
                config.url
                + config.instagram.redirect_uri
                + "?userid=" + req.query.login
            )
        );
    } else {
        res.redirect("/");
    }
});

router.get('/get_token', function (req, res, next) {
    if (req.query.code && req.query.userid) {
        res.redirect(
            "/?login="
            + req.query.userid
            + "&code="
            + req.query.code
        );
    } else {
        res.redirect("/");
    }
});

module.exports = router;
