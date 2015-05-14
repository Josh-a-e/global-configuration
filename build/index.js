'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _configuration = require('./configuration');

function globalConfiguration() {
    var configuration = (0, _configuration.get)();
    void 0;
    if (!configuration) {
        throw new Error('global-configuration has not been set. Do so using global-configuration/set');
    }
    return configuration;
}

exports['default'] = globalConfiguration();
module.exports = exports['default'];