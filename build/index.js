'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _configuration = require('./_configuration');

function globalConfiguration() {
    var conf = (0, _configuration.get)();
    if (!conf) {
        throw new Error('global-configuration has not been set. Do so using global-configuration/set');
    }
    return conf;
}

exports['default'] = globalConfiguration();
module.exports = exports['default'];