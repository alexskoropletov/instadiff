var express = require('express');
var config = require("../config");
var instadiff = require("../bin/instadiff");
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render(
        'index',
        {
            title: config.title,
            description: config.description,
            login: req.query.login || null,
            diff: req.query.login ? instadiff.get(req) : null
        }
    );
});

router.get('/access', function (req, res, next) {
    res.render(
        'index',
        {
            title: config.title,
            description: config.description,
            login: req.query.login || null,
            diff: req.query.login ? instadiff.get(req) : null
        }
    );
});

module.exports = router;
