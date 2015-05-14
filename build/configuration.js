'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _deepFreeze = require('deep-freeze');

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

var configuration = undefined;
var setOptions = {};
var validOptions = ['freeze', 'assign'];
var persisentOptions = ['freeze'];

function set(newConfiguration) {
    var newOptions = arguments[1] === undefined ? {} : arguments[1];

    void 0;
    if (configuration && setOptions.freeze !== false) {
        throw new Error('global-configuration is already set, the initial call should have `freeze` set to false to allow for this behaviour (e.g. in testing');
    }

    if (newOptions) {
        for (var newOption in newOptions) {
            if (!validOptions.indexOf(newOptions)) {
                throw new Error('Unrecognised option passed to global-configuration/set: ' + newOption);
            } else {
                var value = newOptions[newOption];
                if (typeof value !== 'boolean') {
                    throw new Error('Unexpected value type for ' + newOption + ': ' + typeof value + ', boolean expected');
                }

                if (persisentOptions.indexOf(newOption) !== -1) {
                    setOptions[newOption] = value;
                }
            }
        }
    }

    if (newOptions.assign) {
        configuration = (0, _objectAssign2['default'])(configuration, newConfiguration);
    } else {
        configuration = newConfiguration;
    }

    if (setOptions.freeze !== false && Object.freeze && Object.getOwnPropertyNames) {
        configuration = (0, _deepFreeze2['default'])(configuration);
    } else if (!Object.freeze || !Object.getOwnPropertyNames) {
        void 0;
    }
}

function get() {
    return configuration;
}

exports.get = get;
exports.set = set;