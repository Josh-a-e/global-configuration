'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var configuration = undefined;

var setOptions = {};
var validOptions = ['freeze', 'extend'];

function set(newConfiguration) {
    var options = arguments[1] === undefined ? {} : arguments[1];

    if (configuration && !setOptions.freeze) {
        throw new Error('global-configuration is already set, the initial call should have `freeze` set to false to allow for this behaviour (e.g. in testing');
    }

    if (options) {
        for (var option in options) {
            if (!validOptions.indexOf(options)) {
                throw new Error('Unrecognised option passed to global-configuration/set: ' + option);
            } else {
                var value = options[options];
                if (typeof value !== 'boolean') {
                    throw new Error('Unexpected value type for ' + option + ': ' + typeof value + ', boolean expected');
                }
                setOptions[option] = value;
            }
        }
    }
}

function get() {
    return configuration;
}

exports.get = get;
exports.set = set;