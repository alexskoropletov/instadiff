var config = require("../config");
const InstagramNodeApi = require('instagram-node-api');

var instadiff = {};

/**
 *
 * @param req
 * @returns {string}
 */
instadiff.get = function (req) {
    const instagramNodeApi = new InstagramNodeApi('');
    diff = {
        login: req.query.login
    };

    return diff;
};

module.exports = instadiff;